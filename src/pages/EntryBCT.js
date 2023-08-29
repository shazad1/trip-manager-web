import React, { Image } from "react";
import PinInput from "react-pin-input";
import app_logo from "../assets/app_logo.png";
import bct_logo from "..//assets/BCTransport.png";
import Button from '@mui/material/Button';
import firebase from "./../Backend/firebase";
import { useNavigate } from "react-router-dom";
import { TextField } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import "../App.css"




export default function EntryBCT() {

    const [pin, setPin] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [forgetPinClicked, setForgetPinClicked] = React.useState(false);
    const eamilInputRef = React.useRef(null);
    let navigate = useNavigate();

    return (
        <React.Fragment>
               <CssBaseline />
            {!forgetPinClicked && (<div className="entry-container"
            style={{
                backgroundColor: '#041a37'
            }}
            >
            <img style={{
                    marginTop: '1vh',
                    height: "300px",
                    marginBottom: '1vh',
                }} src={bct_logo} />
                <PinInput
                    length={8}
                    focus
                    // disabled
                    //secret
                    style={{
                        margin: 'auto',
                        marginTop: 0,
                        marginBottom: '10vh',
                        flexFlow: 'row nowrap',
                        justifyContent: 'center',
                        alignItems: "center"
                    }}
                    inputStyle={{
                        borderWidth: 2,
                        borderRadius: 15,
                        borderColor: '#ffbd59',
                        backgroundColor: 'azure',
                        fontSize: 24,
                        color: 'salmon'

                    }}
                    inputFocusStyle={
                        {
                            borderColor: 'lightyellow',
                            backgroundColor: 'lightyellow',
                        }
                    }
                    ref={p => { return 19; }}
                    type="numeric"
                    onChange={(text) => { setPin(text) }}
                />

                <Button onClick={
                    () => {

                        if (pin.charAt(0) == '0') {
                            if (pin.charAt(1) == '1' || pin.charAt(1) == '2') {
                                firebase.database.ref("1/clients")
                                    .orderByChild('pin').equalTo(pin)
                                    .on('value', snapshot => {
                                        const exist = snapshot.val();

                                        if (exist) {
                                            localStorage.setItem('pin', pin);
                                            navigate("/bct/clientdash", {
                                                clientName: exist.name
                                            });
                                        } else {
                                            localStorage.removeItem("pin");
                                        }


                                    })

                            } else if (pin.charAt(1) == '3')  {
                                firebase.database.ref("2/drivers")
                                    .orderByChild('pin').equalTo(pin)
                                    .on('value', snapshot => {
                                        let exist = snapshot.val();

                                        if (exist && exist[pin]) {
                                            exist = exist[pin];
                                        }


                                        if (exist && exist.role == 'owner' ) {
                                            localStorage.setItem('pin', pin);
                                            navigate("/bct/adminDash", {
                                                clientName: exist.name
                                            });
                                        } else if (exist && exist.role == 'driver') {
                                            localStorage.setItem('pin', pin);
                                            navigate("/clientdash", {
                                                clientName: exist.name
                                            });
                                        } else {
                                            localStorage.removeItem("pin");
                                        }


                                    })
                            }
                            
                            else {
                                localStorage.removeItem("pin");
                            }
                        } else {
                            localStorage.removeItem("pin");
                        }
                    }
                } variant="contained">Enter</Button>
                <Button
                    style={cssStyles.actionButton}
                    variant="outlined"
                    onClick={() => {
                        setForgetPinClicked(true)
                    }}
                >

                    I forget My Pin

                </Button>

            </div>)}

            {forgetPinClicked && (
            <div className="entry-container"
            style={{
        
                    backgroundColor: '#041a37'
   
            }}
            >
                <img style={{
                    marginTop: '10vh',

                    marginBottom: '4vh',
                }} src={bct_logo} />

                <div>

                    <div>
                        <TextField
                            style={cssStyles.input}
                            onChange={(text) => {
                                setEmail(eamilInputRef?.current.value);
                            }}
                            inputRef={eamilInputRef}
                            value={email}
                            placeholder="enter email registered with app"

                        />

                        <Button
                            variant="contained"
                            style={cssStyles.actionButton}

                            onClick={async () => {
                                try {
                                let response = await fetch("https://asia-southeast2-tawtripmanager.cloudfunctions.net/onForgetPin?email=" + email);
                                } catch(ex) {
                                    console.log(ex);
                                }

                            }}

                        >
                            Email Pin
                        </Button>
                    </div>

                    <Button
                        variant = "outlined"
                        style={cssStyles.actionButton}
                        onClick={() => {
                            setForgetPinClicked(false)
                        }}
                    >
                       
                            I know my Pin
                      
                    </Button>
                </div>

            </div>)}

            <div>version 1.0.1</div>
        </React.Fragment>
    );

}


const cssStyles = {
    container: {
        flex: 1,
        width: '100%',
        height: '80%',
        backgroundColor: '#041a37',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButton: {
        marginTop: 10,
        marginLeft: 10
    },
    punch: {
        fontSize: 20,
        marginBottom: 40,
        marginTop: 10,
        color: '#ff1616',

    },
    input: {
        borderRadius: 10,
        width: '15em',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#bbb',
        backgroundColor: '#eee',
        fontSize: 20
    },
    gap: {
        marginTop: 30,
        marginBottom: 100
    },
    actions: {
        flexDirection: 'row',

        justifyContent: 'space-between'
    },
    logo: {
        flex: 0,
        width: '100%',
        height: '100%',

    },
    logoContainer: {
        flexBasis: "50%",
        width: '100%',
        height: '80%',
        backgroundColor: '#041a37'

    },

    button: {
        fontSize: 44,
        color: '#ffbd59',
        borderWidth: 2,
        borderRadius: 25,
        borderColor: 'mediumturquoise',
        backgroundColor: '#ffbd59',
        padding: 20
    }
};
