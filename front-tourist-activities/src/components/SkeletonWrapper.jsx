export const SkeletonWrapper = ({
  height,
  width,
  maxWidth,
  className,
  children,
  borderRadius,
  boxShadow,
}) => {
  return (
    <div
      className={className}
      style={{ height, width, maxWidth, borderRadius, boxShadow }}
    >
      {children}
    </div>
  );
};
