import Alert from '@material-ui/lab/Alert';

// Component to display error alert message on UI in case data fetching fails
const ErrorPage = () => {
  return <Alert severity="error">Failed to fetch data!</Alert>;
};

export default ErrorPage;
