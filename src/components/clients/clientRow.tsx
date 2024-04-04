import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { DELETE_CLIENT } from "@/mutations/clients";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "@/queries/clientQueries";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ClientRow = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // refetchQueries:[{query: GET_CLIENTS}],
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{client.name}</StyledTableCell>
      <StyledTableCell align="center">{client.email}</StyledTableCell>
      <StyledTableCell align="center">{client.phone}</StyledTableCell>
      <StyledTableCell align="center">
        <Button
          variant="contained"
          disableElevation
          color="error"
          startIcon={<DeleteIcon />}
          size="small"
          onClick={deleteClient}
        >
          Delete
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ClientRow;
