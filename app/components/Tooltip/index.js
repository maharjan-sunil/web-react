/* eslint-disable react/prop-types */
// TODO - Should do pops validation
import React, { useState } from 'react';
import styled from 'styled-components';

const variable = {
  tooltip_text_color: 'white',
  tooltip_background_color: 'black',
  tooltip_margin: '10px',
  tooltip_arrow_size: '6px',
};

const TooltipWrap = styled.div`
  display: inline-block;
  position: relative;
  .Tooltip-Tip {
    position: absolute;
    border-radius: 4px;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px;
    color: ${variable.tooltip_text_color};
    background: ${variable.tooltip_background_color};
    font-size: 0.9rem;
    font-family: sans-serif;
    line-height: 1;
    z-index: 100;
    white-space: nowrap;
    &.tooltip-big {
      white-space: pre-wrap;
      width: 200px;
      word-break: break-word;
      line-height: 1.4;
    }
  }

  /* CSS border triangles */
  .Tooltip-Tip::before {
    content: ' ';
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: ${variable.tooltip_arrow_size};
    margin-left: calc(${variable.tooltip_arrow_size} * -1);
  }

  /* Absolute positioning */
  .Tooltip-Tip.top {
    top: calc(-100% - ${variable.tooltip_margin});
  }
  /* CSS border triangles */
  .Tooltip-Tip.top::before {
    top: 100%;
    border-top-color: ${variable.tooltip_background_color};
  }

  /* Absolute positioning */
  .Tooltip-Tip.right {
    left: calc(100% + ${variable.tooltip_margin});
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }
  /* CSS border triangles */
  .Tooltip-Tip.right::before {
    left: calc(${variable.tooltip_arrow_size} * -1);
    top: 50%;
    transform: translateX(0) translateY(-50%);
    border-right-color: ${variable.tooltip_background_color};
  }

  /* Absolute positioning */
  .Tooltip-Tip.bottom {
  }
  /* CSS border triangles */
  .Tooltip-Tip.bottom::before {
    bottom: 100%;
    border-bottom-color: ${variable.tooltip_background_color};
  }

  /* Absolute positioning */
  .Tooltip-Tip.left {
    left: auto;
    right: calc(100% + ${variable.tooltip_margin});
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }
  /* CSS border triangles */
  .Tooltip-Tip.left::before {
    left: auto;
    right: calc(${variable.tooltip_arrow_size} * -2);
    top: 50%;
    transform: translateX(0) translateY(-50%);
    border-left-color: ${variable.tooltip_background_color};
  }
`;

const Tooltip = props => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  function getClass() {
    let className = '';
    if (props.direction) {
      className = props.direction;
    } else {
      className = 'top';
    }
    if (props.content.length > 50) {
      className += ` tooltip-big`;
    }
    return className;
  }

  return (
    <TooltipWrap
      className="Tooltip-Wrapper"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children}
      {active && (
        <div className={`Tooltip-Tip ${getClass()}`}>
          {/* Content */}
          {props.content}
        </div>
      )}
    </TooltipWrap>
  );
};

export default Tooltip;
