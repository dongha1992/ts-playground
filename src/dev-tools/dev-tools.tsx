// https://github.com/kentcdodds/bookshelf/blob/main/src/dev-tools/dev-tools.js 참고
import { Global } from '@emotion/react';

import '@reach/tabs/styles.css';
import '@reach/tooltip/styles.css';

import { createRoot } from 'react-dom/client';
import { FaTools } from 'react-icons/fa';
import { Tooltip } from '@reach/tooltip';
import { Tabs, TabList, TabPanels, TabPanel, Tab } from '@reach/tabs';
import * as reactQuery from '@tanstack/react-query';
import * as colors from '../constants/colors';
import { useDebugValue, useEffect, useRef, useState } from 'react';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';

function install() {
  // 디버그에 필요한 세팅
  window.reactQuery = reactQuery;

  // @types/webpack-env 설치 require.context 타입 에러 해결
  const requireDevToolsLocal = require.context('./', false, /dev-tools\.local\.js/);
  const local = requireDevToolsLocal.keys()[0];
  if (local) {
    requireDevToolsLocal(local).default;
  }

  function DevTools() {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [hovering, setHovering] = useState(false);
    const [persist, setPersist] = useLocalStorageState('__my_devtools_persist__', false);
    const [tabIndex, setTabIndex] = useLocalStorageState('__my_devtools_tab_index__', 0);

    const show = persist || hovering;
    const toggleShow = () => setPersist((v: boolean) => !v);

    useEffect(() => {
      function updateHoverState(event: any) {
        setHovering(rootRef.current?.contains(event.target) ?? false);
      }
      document.body.addEventListener('mousemove', updateHoverState);
      return () => document.body.removeEventListener('mousemove', updateHoverState);
    }, []);

    return (
      <div
        css={{
          position: 'fixed',
          bottom: -15,
          left: 0,
          right: 0,
          label: {
            margin: 0,
            color: 'rgb(216, 221, 227)',
          },
          'input, select': {
            background: 'rgb(20, 36, 55)',
            border: '2px solid rgb(28, 46, 68)',
            borderRadius: 5,
            color: 'white',
            fontWeight: '600',
            padding: '5px',
            '::placeholder': {
              color: 'rgba(255,255,255,0.3)',
            },
            ':focus': {
              outlineColor: 'black',
              borderColor: 'black',
              outline: '1px',
            },
          },
          'button:not([data-reach-tab])': {
            borderRadius: 5,
            background: 'white',
            ':hover': {
              background: 'black',
            },
            border: 0,
            color: 'gray',
          },
          '[data-reach-tab]': {
            border: 0,
            ':focus': {
              outline: 'none',
            },
          },
          '[data-reach-tab][data-selected]': {
            background: 'rgb(11, 21, 33)',
            borderBottom: '3px solid white',
            marginBottom: -3,
          },
        }}
      >
        <div
          ref={rootRef}
          css={[
            {
              background: 'rgb(11, 21, 33)',
              opacity: '0',
              color: 'white',
              boxSizing: 'content-box',
              height: '60px',
              width: '100%',
              transition: 'all 0.3s',
              overflow: 'scroll',
            },
            show
              ? {
                  height: '50vh',
                  width: '100%',
                  opacity: '1',
                }
              : null,
          ]}
        >
          <Tooltip label="Toggle Persist DevTools">
            <button
              css={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.2rem',
                border: 'none',
                padding: '10px 20px',
                background: 'none',
                marginTop: -40,
                marginLeft: 20,
                position: 'absolute',
                backgroundColor: 'rgb(11,21,33) !important',
                overflow: 'hidden',
                svg: {
                  width: 20,
                  marginRight: 8,
                  color: persist ? 'white' : 'rgba(255,255,255,0.7)',
                },
                '::before': {
                  content: '""',
                  position: 'absolute',
                  height: 4,
                  width: '100%',
                  left: 0,
                  top: 0,
                  background: persist ? 'yellow' : 'transparent',
                },
              }}
              onClick={toggleShow}
            >
              <FaTools />
              <span css={{ color: 'white' }}>Custom DevTools</span>
            </button>
          </Tooltip>
          {show ? (
            <Tabs css={{ padding: 20 }} index={tabIndex} onChange={(i: number) => setTabIndex(i)}>
              <TabList css={{ marginBottom: 20 }}>
                <Tab>Controls</Tab>
                <Tab>Request Failures</Tab>
                <Tab>React Query</Tab>
              </TabList>
              <div
                css={{
                  border: '1px solid rgb(28,46,68)',
                  margin: '0px -20px 20px -20px',
                }}
              />
              <TabPanels css={{ height: '100%' }}>
                <TabPanel>
                  <ControlsPanel />
                </TabPanel>
                <TabPanel>
                  <RequestFailUI />
                </TabPanel>
                <TabPanel>
                  {/* react-query-dev-tools에러남 */}
                  {/* <ReactQueryDevtoolsPanel setIsOpen={() => true} onDragStart={() => {}} /> */}
                </TabPanel>
              </TabPanels>
            </Tabs>
          ) : null}
        </div>
        {show ? (
          <Global
            styles={{
              '#root': {
                marginBottom: '50vh',
              },
            }}
          />
        ) : null}
      </div>
    );
  }

  //Devtools UI root에 삽입
  const devToolsRoot = document.createElement('div');
  document.body.appendChild(devToolsRoot);
  createRoot(devToolsRoot).render(<DevTools />);
}

function ControlsPanel() {
  return (
    <div
      css={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'repeat(auto-fill, minmax(40px, 40px) )',
        gridGap: '0.5rem',
        marginRight: '1.5rem',
      }}
    >
      <EnableDevTools />
      <FailureRate />
      <RequestMinTime />
      <RequestVarTime />
      <ClearLocalStorage />
    </div>
  );
}

function ClearLocalStorage() {
  function clear() {
    window.localStorage.clear();
    window.location.assign(window.location.href);
  }
  return <button onClick={clear}>초기화</button>;
}

function FailureRate() {
  const [failureRate, setFailureRate] = useLocalStorageState('__my_failure_rate__', 0);

  const handleChange = (event: any) => setFailureRate(Number(event.target.value) / 100);
  return (
    <div
      css={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <label htmlFor="failureRate">Request 실패 비율: </label>
      <input
        css={{ marginLeft: 6 }}
        value={failureRate * 100}
        type="number"
        min="0"
        max="100"
        step="10"
        onChange={handleChange}
        id="failureRate"
      />
    </div>
  );
}
function EnableDevTools() {
  const [enableDevTools, setEnableDevTools] = useLocalStorageState('dev-tools', process.env.NODE_ENV === 'development');
  const handleChange = (event: any) => setEnableDevTools(event.target.checked);
  return (
    <div
      css={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <input
        css={{ marginRight: 6 }}
        checked={enableDevTools}
        type="checkbox"
        onChange={handleChange}
        id="enableDevTools"
      />
      <label htmlFor="enableDevTools">항상 dev-tools 사용하기</label>
    </div>
  );
}
function RequestMinTime() {
  const [minTime, setMinTime] = useLocalStorageState('__my_min_request_time__', 400);
  const handleChange = (event: any) => setMinTime(Number(event.target.value));
  return (
    <div
      css={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <label htmlFor="minTime">Request min time (ms): </label>
      <input
        css={{ marginLeft: 6 }}
        value={minTime}
        type="number"
        step="100"
        min="0"
        max={1000 * 60}
        onChange={handleChange}
        id="minTime"
      />
    </div>
  );
}
function RequestVarTime() {
  const [varTime, setVarTime] = useLocalStorageState('__my_variable_request_time__', 400);

  const handleChange = (event: any) => setVarTime(Number(event.target.value));
  return (
    <div
      css={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <label htmlFor="varTime">Request variable time (ms): </label>
      <input
        css={{ marginLeft: 6 }}
        value={varTime}
        type="number"
        step="100"
        min="0"
        max={1000 * 60}
        onChange={handleChange}
        id="varTime"
      />
    </div>
  );
}

function RequestFailUI() {
  const [failConfig, setFailConfig] = useLocalStorageState('__my_request_fail_config__', []);
  function handleSubmit(event: any) {
    event.preventDefault();
    const { requestMethod, urlMatch } = event.target.elements;
    setFailConfig((c: any) => [...c, { requestMethod: requestMethod.value, urlMatch: urlMatch.value }]);
    requestMethod.value = '';
    urlMatch.value = '';
  }
  function handleRemoveClick(index: number) {
    setFailConfig((c: any) => [...c.slice(0, index), ...c.slice(index + 1)]);
  }
  return (
    <div
      css={{
        display: 'flex',
        width: '100%',
      }}
    >
      <form
        onSubmit={handleSubmit}
        css={{
          display: 'grid',
          gridTemplateRows: 'repeat(auto-fill, minmax(50px, 60px) )',
          maxWidth: 300,
          width: '100%',
          marginRight: '1rem',
          gridGap: 10,
        }}
      >
        <div
          css={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <label htmlFor="requestMethod">Method:</label>
          <select id="requestMethod" required>
            <option value="">Select</option>
            <option value="ALL">ALL</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        <div css={{ width: '100%' }}>
          <label css={{ display: 'block' }} htmlFor="urlMatch">
            URL Match:
          </label>
          <input
            autoComplete="off"
            css={{ width: '100%', marginTop: 4 }}
            id="urlMatch"
            required
            placeholder="/api/list-items/:listItemId"
          />
        </div>
        <div>
          <button css={{ padding: '6px 16px' }} type="submit">
            + Add
          </button>
        </div>
      </form>
      <ul
        css={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          width: '100%',
          paddingBottom: '2rem',
        }}
      >
        {failConfig.map(({ requestMethod, urlMatch }: any, index: number) => (
          <li
            key={index}
            css={{
              padding: '6px 10px',
              borderRadius: 5,
              margin: '5px 0',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgb(20,36,55)',
            }}
          >
            <div css={{ display: 'flex', flexWrap: 'wrap' }}>
              <strong css={{ minWidth: 70 }}>{requestMethod}:</strong>
              <span css={{ marginLeft: 10, whiteSpace: 'pre' }}>{urlMatch}</span>
            </div>
            <button
              css={{
                opacity: 0.6,
                ':hover': { opacity: 1 },
                fontSize: 13,
                background: 'rgb(11, 20, 33) !important',
              }}
              onClick={() => handleRemoveClick(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function useLocalStorageState(
  key: string,
  defaultValue: any = '',
  { serialize = JSON.stringify, deserialize = JSON.parse }: any = {}
) {
  const [state, setState] = useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage);
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  useDebugValue(`${key}: ${serialize(state)}`);
  const prevKeyRef = useRef<string>(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
  }, [key]);

  useEffect(() => {
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
}

export { install };

/*
eslint
  no-unused-expressions: "off",
*/
