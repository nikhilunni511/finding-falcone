import React, { useEffect, useState } from 'react';
import './box.css';

export function Box(props) {
  const [value, setValue] = useState('default');
  const buttonClass = `${
    (!!props.isSelected ? 'child-box active' : 'child-box') +
    (props.enable ? ' disable' : '')
  }`;
  useEffect(() => {
    if (props.hasList) {
      Object.keys(props.options).map((item, index) => {
        if (
          props.selectedVehicles[props.planet.id]?.name ===
          props.options[item].name
        ) {
          setValue(index);
        }
      });
    }
  }, [props.selectedVehicles]);
  const handelChange = ({ target }) => {
    setValue(target.value);
    props.onChange(target.value, props.planet);
  };
  return (
    <div
      className={buttonClass}
      onClick={() => !props.hasList && props.onClick(props.id)}
    >
      <img src={require(`../../assets/planets/${props.planet.name}.png`)} />
      <p>
        {props.planet.name}({props.planet.distance})
      </p>
      {!!props.hasList && (
        <select onChange={handelChange} value={value}>
          <option value="default" disabled>
            Select vehicle
          </option>
          {Object.keys(props.options).map((item, index) => {
            return (
              ((props.options[item].max_distance >= props.planet.distance &&
                props.options[item].total_no) ||
                value === index) && (
                <option key={index} value={item}>
                  {props.options[item].name}({props.options[item].total_no})
                </option>
              )
            );
          })}
        </select>
      )}
    </div>
  );
}
