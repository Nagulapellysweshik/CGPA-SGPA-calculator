import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem, Typography,TextField, Grow, Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromHistory } from '../store/historySlice';
import { rollNumberData } from '../data';

const History = () => {
  const dispatch = useDispatch();
  const historyData = useSelector((state) => state.history.historyData);
  const [searchText, setSearchText] = React.useState('');

  const handleDelete = (id) => {
    dispatch(removeFromHistory(id));
  };

  const columns: GridColDef[] = [
    {field: 'avatar', headerName: 'Name', width: 270,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={params.row.avatar} alt="avatar"
            style={{ borderRadius: '50%', width: '40px', height: '40px', marginRight: '8px' }}
          />
          <Typography>{params.row.name}</Typography>
        </div>
      ),
    },
    { field: 'studentId', headerName: 'Student ID', width: 180 },
    { field: 'type', headerName: 'Type', width: 180 },
    { field: 'grade', headerName: 'Grade', width: 180 },
    { field: 'actions', headerName: '', width: 100, renderCell: (params) => (
        <ActionMenu handleDelete={() => handleDelete(params.row.id)} />
      ),
    },
  ];

  const rows = historyData
    .filter((item) => { const studentInfo = rollNumberData[item.studentId];
      return studentInfo && studentInfo.name.toLowerCase().includes(searchText.toLowerCase());
    })
    .map((item, index) => ({id: index, name: rollNumberData[item.studentId]?.name || 'Unknown', type: item.type,
      grade: item.grade,
      studentId: item.studentId,
      avatar: rollNumberData[item.studentId]?.avatar,
    }));
  const ActionMenu = ({ handleDelete }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleMenuItemClick = (action) => {
      handleClose();
      if (action === 'delete') {
        handleDelete();
      }
    };

    return (
      <div>
        <IconButton size="small" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={() => handleMenuItemClick('delete')}>
            <DeleteIcon fontSize="small" />
            Delete
          </MenuItem>
        </Menu>
      </div>
    );
  };

  return (
  <Grow in={true} timeout={1000}>
    <div style={{ height: '100%', width: '100%', animation: 'fadeIn 3s' }}>
      <Card sx={{padding:5, borderRadius: 5, marginBottom: 5, marginTop: 5}}>
      <Typography variant="h3" gutterBottom sx={{textAlign: 'center', marginTop:'5px'}}>History</Typography>
        <TextField label="Search User.." variant="outlined" size="medium" value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: '16px', borderRadius: '50px',}}
        />
        
        <DataGrid rows={rows} columns={columns} pageSize={5} rowHeight={60}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 100]}
          checkboxSelection
        />
        </Card>
    </div>
    </Grow> 
  );
};

export default History;
