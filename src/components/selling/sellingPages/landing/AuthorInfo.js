import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom';
// import Steppers from './Stepper';

function AuthorInfo({handleNext}) {
    const navigate = useNavigate()
    const [isDisabled, setIsDisabled] = useState(true);
    // const [checked, setChecked] = useState(false);
    const [plan, setPlan] = useState("")
    const [userName, setUserName] = useState("")
    // const dataSubmit = () => {
    //     return checked ? setIsDisabled(true) : setIsDisabled(false);
    // };

    // const onCheckboxClick = () => {
    //     setChecked(!checked);
    //     return dataSubmit();
    // };
    const location = useLocation()
    useEffect(() => {
      var getSession = sessionStorage.getItem("accessToken");
      var getLoggedUser = sessionStorage.getItem("loggedInUser")
      var getRegisteredData = JSON.parse(localStorage.getItem("registerdData"))
      
  
      if (!getSession) {
        if (getRegisteredData) {
      
          setUserName(getRegisteredData.username)
        } 
  
      } else {
        setUserName(getLoggedUser)
       
      }
    }, [location])

    const handleValueChange = (e) => {
        setPlan(e.target.value)
        setIsDisabled(false)
    }

    // const handleContinue = () => {
    //     navigate("/join/what_to_sell")
    // }

    return (
        <>
            {/* <Steppers activeStep={2} /> */}
            <div className="author_info_section">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={10}>
                            <div className="author_info_content">
                                <Row>
                                    <Col lg={6} md={12}>
                                        <div className="author_info_head">Hey {userName},<br></br> Welcome on board!</div>

                                        <div className="author_info_subhead">Tell us your plans so that we can give you the information you need to be successful.</div>

                                        <div className="author_info_select">

                                            <div className="form-check choose_cagory">
                                                <input className="form-check-input ms-1 me-3" type="radio" value="I already make my living from making and selling items online" onChange={handleValueChange} name="flexRadioDefault" id="flexRadioDefault1" />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    I already make my living from making and selling items online
                                                </label>
                                            </div>
                                            <div className="form-check choose_cagory">
                                                <input className="form-check-input ms-1 me-3" type="radio" value="I plan to make and sell items full time" onChange={handleValueChange} name="flexRadioDefault" id="flexRadioDefault2" />
                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                    I plan to make and sell items full time
                                                </label>
                                            </div>
                                            <div className="form-check choose_cagory">
                                                <input className="form-check-input ms-1 me-3" type="radio" value="I plan to make and sell items part time" onChange={handleValueChange} name="flexRadioDefault" id="flexRadioDefault3" />
                                                <label className="form-check-label" htmlFor="flexRadioDefault3">
                                                    I plan to make and sell items part time
                                                </label>
                                            </div>

                                            <div className="form-check check_div">
                                                <input className="form-check-input me-2 largerCheckbox" type="checkbox"  id="flexCheckChecked" />
                                                    <label className="form-check-label" htmlFor="flexCheckChecked">
                                                    Join our author mailing list to get all the latest tips from our community
                                                    </label>
                                            </div>

                                            <div className="author_next_btn mt-5">
                                                <button className={plan !== "" ? 'primary_btn' : 'disabled_btn'} disabled={isDisabled} onClick={handleNext}>Next</button>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6} md={12}>
                                        <div className="author_info_img">
                                            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj48c3R5bGU+LnN0MHtmaWxsOiNFMEVERDI7fSAuc3Qxe2ZpbGw6I0UxRUNEMzt9IC5zdDJ7ZmlsbDojRkZGRkZGO30gLnN0M3tmaWxsOm5vbmU7c3Ryb2tlOiM4MEIzNDE7c3Ryb2tlLXdpZHRoOjM7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO30gLnN0NHtmaWxsOm5vbmU7c3Ryb2tlOiNFMUVDRDM7c3Ryb2tlLXdpZHRoOjQ7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fSAuc3Q1e2ZpbGw6bm9uZTtzdHJva2U6I0UwRUREMjtzdHJva2Utd2lkdGg6NDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9IC5zdDZ7ZmlsbDpub25lO3N0cm9rZTojRTFFQ0QzO3N0cm9rZS13aWR0aDo1O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9IC5zdDd7ZmlsbDojRkZGRkZGO3N0cm9rZTojODBCMzQxO3N0cm9rZS13aWR0aDo0O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9IC5zdDh7b3BhY2l0eTowLjIyO30gLnN0OXtmaWxsOiM4MUI0NDE7fSAuc3QxMHtmaWxsOm5vbmU7c3Ryb2tlOiM4MEIzNDE7c3Ryb2tlLXdpZHRoOjMuMDIyNztzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fSAuc3QxMXtmaWxsOm5vbmU7c3Ryb2tlOiM4MEIzNDE7c3Ryb2tlLXdpZHRoOjQ7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO30gI21haW5DaXJjbGUgeyBzdHJva2UtZGFzaGFycmF5OiA1MDA7IGFuaW1hdGlvbjogbWFpbkNpcmNsZS1kcmF3SW4gMS40cyBmb3J3YXJkczsgYW5pbWF0aW9uLWRlbGF5OiAwczsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDUwMDsgfSBAa2V5ZnJhbWVzIG1haW5DaXJjbGUtZHJhd0luIHsgdG8geyBzdHJva2UtZGFzaGFycmF5OiAxMDAwOyBzdHJva2UtZGFzaG9mZnNldDogNTAwOyB9IH0gI2Nsb3VkcyB7IHN0cm9rZS1kYXNoYXJyYXk6IDUwMDsgYW5pbWF0aW9uOiBjbG91ZHMtZHJhd0luIDJzIGZvcndhcmRzOyBhbmltYXRpb24tZGVsYXk6IDAuOHM7IHN0cm9rZS1kYXNob2Zmc2V0OiA1MDA7IG9wYWNpdHk6IDA7IH0gQGtleWZyYW1lcyBjbG91ZHMtZHJhd0luIHsgdG8geyBzdHJva2UtZGFzaGFycmF5OiA5MzA7IHN0cm9rZS1kYXNob2Zmc2V0OiA1MDA7IG9wYWNpdHk6IDE7IH0gfSAjcGxhbmV0T3V0bGluZSB7IGFuaW1hdGlvbjogcGxhbmV0T3V0bGluZS1kcm9wSW4gLjhzIGZvcndhcmRzOyBhbmltYXRpb24tZGVsYXk6IC44czsgb3BhY2l0eTogMDsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0yMHB4KTsgfSBAa2V5ZnJhbWVzIHBsYW5ldE91dGxpbmUtZHJvcEluIHsgdG8geyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTsgb3BhY2l0eTogMTsgfSB9ICNwbGFuZXRTaGFkb3cgeyBhbmltYXRpb246IHBsYW5ldFNoYWRvdy1tb3ZlSW4gLjhzIGZvcndhcmRzOyBhbmltYXRpb24tZGVsYXk6IDFzOyBvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIwcHgpOyB9IEBrZXlmcmFtZXMgcGxhbmV0U2hhZG93LW1vdmVJbiB7IHRvIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDJweCk7IG9wYWNpdHk6IDE7IH0gfSAjcm9ja2V0VHJhaWwgeyBzdHJva2UtZGFzaGFycmF5OiAxNTA7IGFuaW1hdGlvbjogcm9ja2V0VHJhaWwtbW92ZUluIC44cyBmb3J3YXJkczsgYW5pbWF0aW9uLWRlbGF5OiAxLjJzOyBvcGFjaXR5OiAwOyBzdHJva2UtZGFzaG9mZnNldDogNjkwOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTsgfSBAa2V5ZnJhbWVzIHJvY2tldFRyYWlsLW1vdmVJbiB7IHRvIHsgb3BhY2l0eTouNjsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDBweCk7IHN0cm9rZS1kYXNoYXJyYXk6IDE1MDsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDY5MDsgfSB9ICNyb2NrZXRNYWluIHsgYW5pbWF0aW9uOiByb2NrZXRNYWluLWZseVVwIDAuN3MgZm9yd2FyZHM7IGFuaW1hdGlvbi1kZWxheTogMXM7IG9wYWNpdHk6IDA7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSg3MHB4KTsgfSBAa2V5ZnJhbWVzIHJvY2tldE1haW4tZmx5VXAgeyB0byB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwcHgpOyBvcGFjaXR5OiAxOyB9IH0gI2xvY2tfX2xvY2sgeyBhbmltYXRpb246IGxvY2tfX2xvY2stbW92ZUluIC44cyBmb3J3YXJkczsgYW5pbWF0aW9uLWRlbGF5OiAxLjJzOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjBweCk7IG9wYWNpdHk6MDsgfSBAa2V5ZnJhbWVzIGxvY2tfX2xvY2stbW92ZUluIHsgdG8geyBvcGFjaXR5OiAxOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KTsgfSB9ICNsb2NrX19saW5lcyB7IGFuaW1hdGlvbjogbG9ja19fbGluZXMtbW92ZUluIDFzIGZvcndhcmRzOyBhbmltYXRpb24tZGVsYXk6IDEuNHM7IG9wYWNpdHk6MDsgc3Ryb2tlLWRhc2hhcnJheTogMTIwOyBzdHJva2UtZGFzaG9mZnNldDogMzYwOyB9IEBrZXlmcmFtZXMgbG9ja19fbGluZXMtbW92ZUluIHsgdG8geyBvcGFjaXR5OiAxOyBzdHJva2UtZGFzaGFycmF5OiAxMjA7IHN0cm9rZS1kYXNob2Zmc2V0OiAyNjA7IH0gfSAja2V5aG9sZSB7IHN0cm9rZS1kYXNoYXJyYXk6IDEwOyBhbmltYXRpb246IGtleWhvbGUtZHJhd0luIDAuNHMgZm9yd2FyZHM7IGFuaW1hdGlvbi1kZWxheTogMS42czsgb3BhY2l0eTogMDsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDEwO30gQGtleWZyYW1lcyBrZXlob2xlLWRyYXdJbiB7IHRvIHsgc3Ryb2tlLWRhc2hhcnJheTogMTA7IG9wYWNpdHk6IDE7IHN0cm9rZS1kYXNob2Zmc2V0OiAyMDsgfSB9PC9zdHlsZT48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzM5LjkgMTgyLjloLTIuNXYtMi41YzAtLjktLjgtMS43LTEuNy0xLjdzLTEuNy44LTEuNyAxLjd2Mi41aC0yLjVjLS45IDAtMS43LjgtMS43IDEuNyAwIC45LjggMS43IDEuNyAxLjdoMi41djIuNWMwIC45LjggMS43IDEuNyAxLjcuNCAwIC45LS4yIDEuMi0uNS4zLS4zLjUtLjguNS0xLjJ2LTIuNWgyLjVjLjQgMCAuOS0uMiAxLjItLjVzLjUtLjguNS0xLjJjMC0xLS43LTEuNy0xLjctMS43eiIgaWQ9InN0YXI0Ii8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTI5MS42IDE2LjJoLTMuMXYtMy4xYzAtMS4yLTEtMi4yLTIuMi0yLjItMS4yIDAtMi4yIDEtMi4yIDIuMnYzLjFIMjgxYy0xLjIgMC0yLjIgMS0yLjIgMi4yczEgMi4yIDIuMiAyLjJoMy4xdjMuMWMwIDEuMiAxIDIuMiAyLjIgMi4yLjYgMCAxLjEtLjIgMS41LS42LjQtLjQuNi0xIC42LTEuNXYtMy4xaDMuMWMuNiAwIDEuMS0uMiAxLjUtLjYuNC0uNC42LTEgLjYtMS41LjItMS40LS44LTIuNC0yLTIuNHoiIGlkPSJzdGFyMyIvPjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik01Ny42IDU0aC0zLjF2LTMuMWMwLTEuMi0xLTIuMi0yLjItMi4ycy0yLjIgMS0yLjIgMi4yVjU0SDQ3Yy0xLjIgMC0yLjIgMS0yLjIgMi4yczEgMi4yIDIuMiAyLjJoMy4xdjMuMWMwIDEuMiAxIDIuMiAyLjIgMi4yLjYgMCAxLjEtLjIgMS41LS42LjQtLjQuNi0xIC42LTEuNXYtMy4xaDMuMWMuNiAwIDEuMS0uMiAxLjUtLjYuNC0uNC42LTEgLjYtMS41LjItMS40LS44LTIuNC0yLTIuNHoiIGlkPSJzdGFyMiIvPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00OC4zIDE4My41aC0ydi0yYzAtLjgtLjYtMS40LTEuNC0xLjQtLjggMC0xLjQuNi0xLjQgMS40djJoLTJjLS44IDAtMS40LjYtMS40IDEuNHMuNiAxLjQgMS40IDEuNGgydjJjMCAuOC42IDEuNCAxLjQgMS40LjQgMCAuNy0uMiAxLS40LjMtLjMuNC0uNi40LTF2LTJoMmMuNCAwIC43LS4yIDEtLjQuMy0uMy40LS42LjQtMSAwLS44LS42LTEuNC0xLjQtMS40eiIgaWQ9InN0YXIxIi8+PGcgaWQ9InBsYW5ldFNoYWRvdyI+PGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iMzM1LjEiIGN5PSIxMDguNSIgcj0iMzUuMyIvPjxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjMyMy44IiBjeT0iODguMyIgcj0iNS40Ii8+PGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iMzM3LjQiIGN5PSI4Mi45IiByPSIyLjciLz48L2c+PGcgaWQ9InBsYW5ldE91dGxpbmUiPjxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0zMTIuMiAxMzQuMmM1LjQgMy4zIDExLjggNS4zIDE4LjcgNS4zIDE5LjcgMCAzNS43LTE2IDM1LjctMzUuN3MtMTYtMzUuNy0zNS43LTM1LjdjLTE2IDAtMjkuNiAxMC42LTM0LjEgMjUuMSIvPjxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0zMjMuOCAxMjMuOGMyLjIuOCA0LjQgMS42IDYuNiAyLjMgMjQgNy44IDQ0LjkgNy41IDQ4LjMtMS4yIDItNS4yLTIuNy0xMi40LTExLjctMTkuNU0zMDQgODAuM2MtMTEuNi0xLjgtMjAuMy0uMy0yMi43IDQuOC0uNyAxLjUtLjkgMy4yLS41IDUuMSIvPjwvZz48ZyBpZD0ibWFpbkNpcmNsZSI+PHBhdGggY2xhc3M9InN0NCIgZD0iTTQ4LjYgMzA5LjdjLTE4LjItMjgtMjguOC02MS40LTI4LjgtOTcuMyAwLTk4LjggODAuMS0xNzguOSAxNzguOS0xNzguOSAzNi44IDAgNzEgMTEuMSA5OS41IDMwLjJNMTAzLjEgMzYzLjZjLTcuOS01LTE1LjQtMTAuNi0yMi40LTE2LjciLz48cGF0aCBjbGFzcz0ic3Q1IiBkPSJNMzY4LjEgMTU0LjVjNi4yIDE4LjIgOS42IDM3LjYgOS42IDU3LjkgMCA5OC44LTgwLjEgMTc4LjktMTc4LjkgMTc4LjkiLz48Y2lyY2xlIGNsYXNzPSJzdDQiIGN4PSIxMTUuMyIgY3k9IjEwNS44IiByPSIxNy41Ii8+PGNpcmNsZSBjbGFzcz0ic3Q0IiBjeD0iODkuNSIgY3k9IjE1NC41IiByPSIxMy4xIi8+PC9nPjxwYXRoIGNsYXNzPSJzdDYiIGQ9Ik0zOC4xIDIzOS40YzMuNi0zIDguMi01IDEzLjMtNSAxMS4yIDAgMjAuNCA5LjEgMjAuNCAyMC40di44YzEuOS0uNCAzLjctLjYgNS42LS43IDEyLjctOC40IDI4LTEzLjMgNDQuNC0xMy4zIDI1LjkgMCA0OSAxMi4yIDYzLjggMzEuMSA0LjMtMyA5LjUtNC44IDE1LjEtNC44IDguNiAwIDE2LjIgNC4xIDIxIDEwLjUgMTIuOC04LjQgMjgtMTMuMyA0NC41LTEzLjMgMTEuNyAwIDIyLjkgMi41IDMyLjkgNyA2LjMtMTMuNCAyMC0yMi43IDM1LjgtMjIuNyA3LjYgMCAxNC42IDIuMiAyMC42IDUuOCIgaWQ9ImNsb3VkcyIvPjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xODUuNSAyNzUuN2M0LjMtMyA5LjUtNC44IDE1LjEtNC43IDcuNiAwIDE0LjQgMy4zIDE5LjIgOC40bC4yLTY3LjctNDIuMS0uMi0uMiA1NS41YzIuOCAyLjggNS40IDUuNyA3LjggOC43eiIgaWQ9InJvY2tldFRyYWlsIi8+PGcgaWQ9InJvY2tldE1haW4iPjxnIGlkPSJyb2NrZXRCb2R5Ij48cGF0aCBpZD0icGF0aDMwMl84XyIgY2xhc3M9InN0NyIgZD0iTTE5OS4zMyA4LjIyNmMtOS40IDAtNDcuOCA0OS4xLTQ3LjggMTA2LjkgMCA1Ni4xIDE2LjkgOTIuMSAxNy4xIDkyLjUuMi41LjYuOCAxLjEgMSAuNC4yIDEwLjYgMy43IDI5LjYgMy43czI5LjEtMy41IDI5LjYtMy43Yy41LS4yLjktLjYgMS4xLTEgLjEtLjQgMTctMzYuNCAxNy05Mi41LjEtNTcuOC0zOC40LTEwNi45LTQ3LjctMTA2LjkiLz48L2c+PGcgaWQ9Im5vc2VDb25lIiBjbGFzcz0ic3Q4Ij48cGF0aCBpZD0icGF0aDMwNl82XyIgY2xhc3M9InN0OSIgZD0iTTIyNy4zMSA0MWMtMTEuMS0yMC4xLTIzLjItMzIuOC0yOC0zMi44LTQuOCAwLTE2LjkgMTIuOC0yOCAzMi44IDMuMS45IDEyLjMgMy4yIDI4IDMuMnMyNC45LTIuMiAyOC0zLjIiLz48L2c+PGNpcmNsZSBpZD0id2luZG93QmlnIiBjbGFzcz0ic3QwIiBjeD0iMjAyLjQiIGN5PSIxMDEuNiIgcj0iMTQuNCIvPjxjaXJjbGUgaWQ9IndpbmRvd0JpZ0xpbmUiIGNsYXNzPSJzdDEwIiBjeD0iMTk5LjMiIGN5PSI5OC42IiByPSIxNC40Ii8+PGNpcmNsZSBpZD0id2luZG93U21hbGwiIGNsYXNzPSJzdDAiIGN4PSIyMDIuNCIgY3k9IjE1Mi43IiByPSIxMC41Ii8+PGNpcmNsZSBpZD0id2luZG93U21hbGxMaW5lIiBjbGFzcz0ic3QxMCIgY3g9IjE5OS4zIiBjeT0iMTUwLjMiIHI9IjEwLjUiLz48cGF0aCBpZD0id2luZ0xlZnQiIGNsYXNzPSJzdDExIiBkPSJNMTY4LjUgMjA4LjVjLTkuNi0yNi43LTE1LjYtNTUuMS0xNy40LTg0LjctMTMuOSAxOC0yMi4xIDQwLjYtMjIuMSA2NS4xIDAgMTYuNCAzLjcgMzIgMTAuMyA0NS45IDIuMi0xNC4zIDE0LjMtMjUuNiAyOS4yLTI2LjN6Ii8+PHBhdGggaWQ9IndpbmdSaWdodCIgY2xhc3M9InN0MTEiIGQ9Ik0yMzAgMjA4LjVjOS42LTI2LjcgMTUuNi01NS4xIDE3LjQtODQuNyAxMy45IDE4IDIyLjEgNDAuNiAyMi4xIDY1LjEgMCAxNi40LTMuNyAzMi0xMC4zIDQ1LjktMi4yLTE0LjMtMTQuMy0yNS42LTI5LjItMjYuM3oiLz48L2c+PC9zdmc+" className='img-fluid' alt="" />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default AuthorInfo