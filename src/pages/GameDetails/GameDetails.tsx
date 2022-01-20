import React, { useEffect, useState, useReducer } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import ReactLoading from 'react-loading';
import { 
    FormControlLabel, 
    RadioGroup, 
    Radio, 
    Snackbar, 
    Box, 
    Modal, 
    Button, 
    Select, 
    FormControl, 
    MenuItem, 
    InputLabel 
} from '@mui/material'
import MuiAlert from '@mui/material/Alert';

import { gamesStateType } from '../../redux/reducers/gamesReducer';
import { campaignsStateType } from '../../redux/reducers/campaignsReducer';

import './GameDetails.css';
import { gameObjType } from '../../redux/types';
import Chart from '../../components/Chart/Chart';
import { getRamdomCampaignData } from '../../utils';
import { campaignType } from '../../redux/types';
import { fetchCampaigns } from '../../redux/actions/actions';
import { ADD_CAMPAIGN } from '../../redux/actions/actionTypes';
import Table from '../../components/Table/Table';

// Converts date-string to dd.mm.yyyy format
const modifyDate = (dateStr: string): string => {
    const date: Date = new Date(dateStr);
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
}

const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: '5px'
};

// Snackbar State Handling
const SUCCESS = "SUCCESS";
const ERROR_ALREADY_EXISTS = "ERROR_ALREADY_EXISTS";
const ERROR_MINIMUM_LENGTH = "ERROR_MINIMUM_LENGTH";
const CLOSE = "CLOSE";

const snackbarReducer = (state, action) => {
    switch(action.type) {
        case SUCCESS:
            return {
                openSnackbar: true,
                alertMessage: `New Campaign "${action.payload}" added to the list`,
                alertType: 'success'
            };
        case ERROR_ALREADY_EXISTS:
            return {
                openSnackbar: true,
                alertMessage: `Campaign name "${action.payload}" already exists`,
                alertType: 'error'
            };
        case ERROR_MINIMUM_LENGTH:
            return {
                openSnackbar: true,
                alertMessage: `Campaign name should be at least 7 characters`,
                alertType: 'error'
            };
        case CLOSE:
            return {
                openSnackbar: false,
                alertMessage: '',
                alertType: 'error'
            };
        default:
            return state;
    }
};

const GameDetails = (): JSX.Element | null => {
    const dispatch = useDispatch();
    let { id }: { id: string } = useParams();
    
    const { gamesList }: gamesStateType = useSelector(({ games }: { games: gamesStateType }) => games);
    const { loading, campaignsList }: campaignsStateType = useSelector(({ campaigns }: { campaigns: campaignsStateType}) => campaigns);
    const currentGameObj: gameObjType | undefined = gamesList.find((game: gameObjType) => game.id === id);
    
    const [curCampaignObj, setCurCampaignObj] = useState<campaignType>({id: "", name: "", installs: []});

    // State for choosing (Chart View) or (Table View)
    const [viewType, setViewType] = useState<"chart" | "table">("chart");

    // State for handling Snackbar
    const [snackbarState, snackbarDispatch] = useReducer(
        snackbarReducer,
        {
            openSnackbar: false,
            alertMessage: '',
            alertType: 'error'
        }
    );

    // State for handling Modal
    const [modalText, setModalText] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchCampaigns());
    }, [dispatch]);

    useEffect(() => {
        if (campaignsList.length > 0) {
            setCurCampaignObj(campaignsList[0]);
        }
    }, [campaignsList]);

    // Handler for change of item in the dropdown
    const onChangeCampaign = (event): void => {
        const curCamp: campaignType | undefined = campaignsList.find((campaign: any)=> campaign.id === event.target.value)
        if (curCamp) {
            setCurCampaignObj(curCamp);
        }
    };

    // Modal's Input Text handler
    const handleTextChange = (e): void => {
        setModalText(e.target.value);
    }

    // Handles Radio Button changes
    const handleViewTypeChange = (e):void => {
        setViewType(e.target.value);
    }

    const validateCampaignName = (): boolean => {
        if (modalText.length < 7) {
            snackbarDispatch({ type: ERROR_MINIMUM_LENGTH });
            return false;
        }
        const alreadyExists: campaignType | undefined = campaignsList.find(campaign => campaign.name === modalText);
        if (alreadyExists) {
            snackbarDispatch({ type: ERROR_ALREADY_EXISTS, payload: modalText });
            setModalText("");
            return false;
        }
        return true;
    }

    // New Campaign is added to the State
    const addCampaign = (): void => {
        let valid = validateCampaignName();
        if (valid) {
            const newCampaign: campaignType = getRamdomCampaignData(modalText, campaignsList.length);
            snackbarDispatch({ type: SUCCESS, payload: modalText });
            setModalText("");
            dispatch({ type: ADD_CAMPAIGN, payload: newCampaign });
            setOpenModal(false);
        }
    }

    if (currentGameObj) {
        const { icon, createdAt, name, installs, revenue } = currentGameObj;
        return (
            <div className='game-details'>
                {/* Game Info Start */}
                <div className="game-details__game-info">
                    <img src={icon} alt={name} height={100} width={100} />
                    <div className='game-details__text'>
                        <p className='game-name'>{name}</p>
                        <p className='game-date'>created on {modifyDate(createdAt)}</p>
                    </div>
                </div>
                {/* Game Info end */}

                {/* Game Chart start */}
                <div className="game-details__game-charts">
                    <Chart title={"Installs"} data={installs} />
                    <Chart title={"Revenue"} data={revenue} />
                </div>
                {/* Game Chart end */}

                <hr />

                {/* Campaign */}
                <div className="game-details__campaign">
                    <div className='game-details__campaign-form'>
                        {
                            loading?
                            <ReactLoading type={'spin'} color={'white'} height={75} width={75} />
                            :
                            <>
                                {
                                    campaignsList.length > 0?
                                    <FormControl>
                                        <InputLabel>Campaigns</InputLabel>
                                        <Select
                                            style={{ color: "white" }}
                                            labelId="campaign-select-label"
                                            id="campaign-select"
                                            label="Campaigns"
                                            value={curCampaignObj?.id}
                                            onChange={onChangeCampaign}
                                        >
                                            {
                                                campaignsList.map((campaign: any) => <MenuItem key={campaign.id} value={campaign.id}>{campaign.name}</MenuItem>)
                                            }
                                        </Select>
                                        <RadioGroup
                                            aria-label="View Type"
                                            value={viewType}
                                            onChange={handleViewTypeChange}
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel value="chart" control={<Radio />} label="Chart" />
                                            <FormControlLabel value="table" control={<Radio />} label="Table" />
                                        </RadioGroup>
                                    </FormControl>
                                    :
                                    null
                                }
                                <Button style={{backgroundColor: "#e6006c"}} onClick={() => setOpenModal(true)} variant="contained">New Campaign</Button>
                                
                                {/* Popup-Modal Start */}
                                <Modal
                                    open={openModal}
                                    onClose={() => setOpenModal(false)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={boxStyle}>
                                        <input 
                                            type="text"
                                            className='modal-input'
                                            value={modalText}
                                            onChange={e => handleTextChange(e)}
                                        />
                                        <Button style={{backgroundColor: "#e6006c"}} onClick={addCampaign} variant="contained">Add</Button>
                                    </Box>
                                </Modal>
                                {/* Popup-Modal End */}
                                
                                {/* Snackbar Start */}
                                <Snackbar
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                    open={snackbarState.openSnackbar} 
                                    autoHideDuration={2000} 
                                    onClose={() => snackbarDispatch({ type: CLOSE })} 
                                >
                                    <MuiAlert elevation={6} variant="filled" severity={snackbarState.alertType}>
                                        {snackbarState.alertMessage}
                                    </MuiAlert>
                                </Snackbar>
                                {/* Snackbar End */}
                            </>
                        }
                    </div>
                    <div className='game-details__campaign-chart'>
                        {
                            loading?
                            <ReactLoading type={'spin'} color={'white'} height={75} width={75} />
                            :
                            viewType === "chart"?
                            <Chart title={"Installs"} data={curCampaignObj.installs} />
                            :
                            <Table data={curCampaignObj.installs} />
                        }
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default GameDetails;
