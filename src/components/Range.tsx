import classnames from 'classnames';
import { ChangeEvent, cloneElement, InputHTMLAttributes, ReactElement, useCallback, useEffect, useState } from 'react';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /**
   * `range`의 value입니다. 정의되지 않으면 range는 유저의 이벤트에 의해 value값이 바뀝니다.
   */
  value?: number;

  /**
   * `value`의 최솟값을 정합니다.
   */
  minValue?: number;

  /**
   * `value`의 최댓값을 정합니다.
   */
  maxValue?: number;

  /**
   * `range`의 트랙에 채워지는 색상을 바꿉니다.
   */
  color?: string;

  /**
   * range 아래에 붙을 Label을 설정합니다.
   */
  label?: {
    min: string;
    max: string;
    mid?: string;
  };

  tooltip?: ReactElement;

  onChange?: (value: number) => void;
}

function Range({
  className,
  min = 0,
  max = 100,
  minValue = Number(min),
  maxValue = Number(max),
  value: outerValue = (minValue + maxValue) / 2,
  color,
  tooltip,
  label,
  onChange = noop,
  ...props
}: Props) {
  const [value, setValue] = useState<number>(outerValue);
  const progress = (value - minValue) / (maxValue - minValue);

  useEffect(() => {
    setValue(outerValue);
  }, [outerValue]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const val = Number(event.target.value);
      setValue(val);
      onChange?.(val);
    },
    [onChange]
  );

  return (
    <div className={classnames('range', { 'range--has-tooltip': tooltip !== undefined }, className)}>
      <div className="range__range">
        <div className="range__track">
          <div className="range__progress-container" style={{ transform: `translateX(${progress * 100}%)` }}>
            <span
              className="range__progress-bar"
              style={{
                backgroundColor: color,
              }}
            />
            {tooltip !== undefined
              ? cloneElement(tooltip, {
                  message: String(value),
                  children: <span className="range__progress-origin" />,
                  open: true,
                  offset: 20,
                  placement: 'top',
                  ...tooltip.props,
                })
              : null}
          </div>
        </div>
        <input
          className="range__input"
          type="range"
          value={value}
          min={minValue}
          max={maxValue}
          onChange={handleChange}
          {...props}
        />
      </div>
      {label !== undefined ? (
        <div className="range__label-row">
          <label className="range__label-row__label font-size--13">{label.min}</label>
          {label.mid != null ? <label className="range__label-row__label font-size--13">{label.mid}</label> : null}
          <label className="range__label-row__label font-size--13">{label.max}</label>
        </div>
      ) : null}
    </div>
  );
}

export default Range;

function noop() {}
