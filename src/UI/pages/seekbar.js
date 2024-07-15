import React, { useState } from 'react';

var SeekBar = function SeekBar(props) {
    var _useState = useState(props.progress),
        value = _useState[0],
        setValue = _useState[1];
    var handleNo = function handleNo(event) {
        props.getNumber({...props.data, [props.name]: parseInt (event.target.value) });
        setValue(event.target.value / props.percent);
    };

    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
        style: {
            '--head-color': props.headColor,
            '--changeColorPosition': value + "%",
            '--background': props.backgroundColor,
            '--fillColor': props.fillColor,
            '--fillSecondry': props.fillSecondaryColor == undefined ? props.fillColor : props.fillSecondaryColor,
            '--width': props.width,
            '--headShadowColor': props.headShadow,
            '--headShadowSize': props.headShadowSize === 0 ? '' : props.headShadowSize + "px"
        },
        type: "range",
        name: "vol",
        value: value * props.percent,
        min: props.min,
        max: props.max,
        onChange: handleNo
    }));
};

export default SeekBar;