import { Box, Button, Container, MenuItem, TextField, Typography } from "@mui/material"
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import type { AppDispatch, RootState } from "../../redux/store";
import { createTask, fetchTasks, updateTask } from "../../redux/slices/task.slice";

const validationSchema = Yup.object({
  title: Yup.string().required('Título obrigatório'),
  description: Yup.string().required('Descrição obrigatória'),
  dueDate: Yup.date().required('Data obrigatória'),
  status: Yup.string().required('Status obrigatório')
});

export const TaskFormPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { uuid } = useParams();
  const isEditing = !!uuid;

  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    status: '',
  });

  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((t) => t.uuid === uuid)
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (isEditing) {
        await dispatch(updateTask({ uuid: uuid, data: values }));
      } else {
        await dispatch(createTask(values));
      }
      dispatch(fetchTasks());
      navigate('/tarefas');
    }
  });

  useEffect(() => {
    if (isEditing && task) {
      setInitialValues({
        title: task.title,
        description: task.description || '',
        dueDate: task.dueDate,
        status: task.status
      });
    }
  }, [isEditing, task]);

  return (
    <Container maxWidth='sm'>
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          {isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Título"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && !!formik.errors.title}
            helperText={formik.touched.title && formik.errors.title}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Descrição"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && !!formik.errors.description}
            helperText={formik.touched.description && formik.errors.description}
            margin="normal"
          />
          <TextField
            fullWidth
            type="date"
            label="Data de Vencimento"
            name="dueDate"
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            error={formik.touched.dueDate && !!formik.errors.dueDate}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            error={formik.touched.status && !!formik.errors.status}
            helperText={formik.touched.status && formik.errors.status}
            margin="normal"
          >
            <MenuItem value="DONE">Feito</MenuItem>
            <MenuItem value="LATE">Atrasada</MenuItem>
            <MenuItem value="STARTED">Em Progresso</MenuItem>
            <MenuItem value="TESTTING">Testando</MenuItem>
            <MenuItem value="PENDING" selected>Pendente</MenuItem>
          </TextField>
          <Box sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" fullWidth>
              {isEditing ? 'Salvar Alterações' : 'Criar Tarefa'}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}