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
            background: 'black',
            ':hover': {
              background: 'black',
            },
            border: 0,
            color: 'black',
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
              Custom DevTools
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
  return <div>ControlsPanel</div>;
}
function ClearLocalStorage() {}
function FailureRate() {}
function EnableDevTools() {}
function RequestMinTime() {}
function RequestVarTime() {}
function RequestFailUI() {
  return <div>RequestFailUI</div>;
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
