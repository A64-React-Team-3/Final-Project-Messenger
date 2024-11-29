/**
 * LoadingSpinner Component
 *
 * A loading spinner built with DaisyUI tailwind classes.
 * This component provides a consistent way to display loading states across the application.
 * @component
 * @returns {JSX.Element} A spinner centered within a full-screen container.
 */
const LoadingSpinner: React.FC = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
};

export default LoadingSpinner;
