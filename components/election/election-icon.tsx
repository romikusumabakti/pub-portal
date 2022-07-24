const ElectionIcon = ({ ...rest }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
      <path
        className="fill-primary"
        d="M17,7.9l-4.9,4.9L8.5,9.4l4.9-4.9L17,7.9z M12.8,2.3L6.4,8.7c-0.4,0.4-0.4,1,0,1.4l5,4.9c0.4,0.4,1,0.4,1.4,0
l6.4-6.4c0.4-0.4,0.4-1,0-1.4l-5-4.9C13.8,1.9,13.1,1.9,12.8,2.3z"
      />
      <path
        className="fill-on-surface"
        d="M18,13h-0.7l-2,2h1.9l1.8,2H5l1.8-2h2.1l-2-2H6l-3,3v4c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-4L18,13z"
      />
    </svg>
  );
};

export default ElectionIcon;
