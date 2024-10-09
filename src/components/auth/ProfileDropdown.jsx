import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Swal from "sweetalert2";
import { useAuthStore } from "./store/useAuthStore";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {

    const navigate = useNavigate()
    const { currentUser, clearAuth } = useAuthStore();

    // State for controlling the popover's open status and id
    const [popoverState, setPopoverState] = useState({
        open: false,
        id: undefined
    });

    const handleAvatarClick = (e) => {
        setPopoverState({
            open: true,
            id: "simple-popover",
            anchorEl: e.currentTarget
        });
    };

    const handleAvatarClose = () => {
        setPopoverState({
            open: false,
            id: undefined,
            anchorEl: null
        });
    };

    const logout = (e) => {
        setPopoverState({...popoverState, open: false})
        Swal.fire({
            title: "¿Desea cerrar su sesión?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#015dfc",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Confirmar",
        }).then((result) => {
            if (result.isConfirmed) {
                clearAuth();
                navigate('/login');
            }
        });
    };

    return (
        <div>
            <Stack direction="row" spacing={1}>
                <Button onClick={handleAvatarClick} style={{ color: "black" }}>
                    <div className="user">
                        <div>
                            <p>{currentUser.username}</p>
                            <p>{currentUser.correo}</p>
                        </div>
                        <div>
                            <img src="/assets/img/user.svg" alt="Usuario" />
                        </div>
                        <KeyboardArrowDownIcon />
                    </div>
                </Button>
            </Stack>

            <Popover
                id={popoverState.id}
                open={popoverState.open}
                anchorEl={popoverState.anchorEl}
                onClose={handleAvatarClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
            >
                <List disablePadding>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary="Cuenta" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding onClick={logout}>
                        <ListItemButton>
                            <ListItemText primary="Cerrar sesión" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Popover>
        </div>
    );
};

export default ProfileDropdown;
