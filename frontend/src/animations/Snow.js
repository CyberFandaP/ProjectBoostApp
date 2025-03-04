import React, { useEffect, useRef } from 'react';
import './Snow.css';
import _ from 'lodash';

const defaultOptions = {
  color: 'orange',
  radius: [0.5, 3.0],
  speed: [1, 3],
  wind: [-0.5, 3.0],
};

const SnowItem = (canvas, drawFn = null, opts) => {
  const options = { ...defaultOptions, ...opts };
  const { radius, speed, wind, color } = options;
  const params = {
    color,
    x: _.random(0, canvas.offsetWidth),
    y: _.random(-canvas.offsetHeight, 0),
    radius: _.random(...radius),
    speed: _.random(...speed),
    wind: _.random(...wind),
    isResized: false,
  };
  
  const ctx = canvas.getContext('2d');

  const updateData = () => {
    params.x = _.random(0, canvas.offsetWidth);
    params.y = _.random(-canvas.offsetHeight, 0);
  };

  const resized = () => (params.isResized = true);

  const drawDefault = () => {
    ctx.beginPath();
    ctx.arc(params.x, params.y, params.radius, 0, 2 * Math.PI);
    ctx.fillStyle = params.color;
    ctx.fill();
    ctx.closePath();
  };

  const draw = drawFn ? () => drawFn(ctx, params) : drawDefault;

  const translate = () => {
    params.y += params.speed;
    params.x += params.wind;
  };

  const onDown = () => {
    if (params.y < canvas.offsetHeight) return;

    if (params.isResized) {
      updateData();
      params.isResized = false;
    } else {
      params.y = 0;
      params.x = _.random(0, canvas.offsetWidth);
    }
  };

  const update = () => {
    translate();
    onDown();
  };

  return {
    update,
    resized,
    draw,
  };
};

const Snow = ({ count = 150, options = { color: 'white' } }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const snowflakes = [];

    const add = (item) => snowflakes.push(item(canvas));

    const update = () => _.forEach(snowflakes, (el) => el.update());

    const resize = () => {
      ctx.canvas.width = canvas.offsetWidth;
      ctx.canvas.height = canvas.offsetHeight;

      _.forEach(snowflakes, (el) => el.resized());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      _.forEach(snowflakes, (el) => el.draw());
    };

    const loop = () => {
      draw();
      update();
      requestAnimationFrame(loop);
    };

    _.times(count, () => add(() => SnowItem(canvas, null, options)));

    window.addEventListener('resize', resize);
    resize();
    loop();

    return () => window.removeEventListener('resize', resize);
  }, [count, options]);

  return <canvas ref={canvasRef} className="snow"></canvas>;
};

export default Snow;