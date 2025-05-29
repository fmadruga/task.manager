import { Box, Button, Chip, Container, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchTasks } from "../../redux/slices/task.slice";
import { useEffect } from "react";
import ActionsMenu from "../../components/ActionsMenu";
import { format } from 'date-fns'
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";

const TasksPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading } = useSelector((state: RootState) => state.tasks);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const TaskStatus = (status: string) => {
    switch (status) {
      case 'DONE':
        return <Chip label="Feito" color="success" />
      
      case 'LATE':
        return <Chip label="Atrasada" color="error" />
      
      case 'STARTED':
        return <Chip label="Em Progresso" color="success" />
      
      case 'TESTING':
        return <Chip label="Testando" color="info" />
    
      default:
        return <Chip label="Pendente" color="default" />
    }
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Título', flex: 1 },
    { field: 'description', headerName: 'Descrição', flex: 2 },
    {
      field: 'dueDate',
      headerName: 'Vencimento',
      flex: 1,
      valueFormatter: (params) => format(new Date(params), 'dd/MM/yyyy')
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (param) => TaskStatus(param.value)
    },
    {
      field: 'actions',
      headerName: 'Ações',
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <ActionsMenu
          uuid={params.row.uuid}
          onActionComplete={() => dispatch(fetchTasks())}
        />
      )
    }
  ];

  

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tarefas
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => navigate('/tarefa')}
        >
          Nova Tarefa
        </Button>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={tasks}
            columns={columns}
            loading={loading}
            pageSizeOptions={[5, 10, 20]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } }
            }}
          />
        </div>
      </Box>
    </Container>
  );
}

export default TasksPage;