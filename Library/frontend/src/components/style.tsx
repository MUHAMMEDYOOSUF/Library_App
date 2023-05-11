import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  heading: {
    marginBottom: "1rem",
  },
  table: {
    minWidth: 650,
  },
  tableLine: {
    fontWeight: "normal",
    fontSize: "1rem",
  },
  tableCell: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
  },
  button: {
    margin: "0 1rem",
  },
  borrowedButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#d32f2f",
    },
  },
});
export default useStyles;
