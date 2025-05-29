import { IconButton, Menu, MenuItem } from "@mui/material";
import { Fragment, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";
import { deleteTask } from "../../redux/slices/task.slice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";

interface Props {
  uuid: string;
  onActionComplete: () => void;
}

const ActionsMenu = ({ uuid, onActionComplete }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleEdit = () => {
    navigate(`/tarefa/editar/${uuid}`);
    handleClose();
  };

  const handleDelete = async () => {
    await dispatch(deleteTask(uuid));
    onActionComplete();
    handleClose();
  };

  return (
    <Fragment>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={handleDelete}>Deletar</MenuItem>
      </Menu>
    </Fragment>
  );
}

export default ActionsMenu;
