import React, { useState, useContext } from "react";
import UserContext from "./userContext";
import CarbonApi from "./Api"

import { Row, Col, Button, Form, FormGroup, Label, Input, ListGroup } from 'reactstrap';


function CarbonForm() {
    const { curUser, setCurUser } = useContext(UserContext)
    const initalState = {
        password: "",
    }
    const [formData, setformData] = useState(initalState);
    const [currCo2, setcurrCo2] = useState(0);
    const [formErrors, setFormErrors] = useState([]);
    const { number, time } = formData

    // send and display data from external API Call
    const retriveCPUCarbon = async (formData) => {

        // gather
        let inputData = {
            "emission_factor": "cpu-provider_aws-region_us_west_1",
            "parameters":
            {
                "number": +formData.number,
                "time": +formData.time,
                "time_unit": "h"
            }
        }

        try {
            let carbonCpu = await CarbonApi.requestCPU(inputData)
            console.log("IT WORKED CARBON API!!!", carbonCpu);
            setcurrCo2(carbonCpu.co2e)
        } catch (error) {
            console.log("Error: ", error);
            setFormErrors(error)
            return;
        }

    }


    // handle Change
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setformData(f => ({
            ...f,
            [name]: value
        }))
    }

    // Handle submit:
    const handleSubmit = (evt) => {
        evt.preventDefault()
        retriveCPUCarbon(formData)
        // Collect updated form data and re-render local form state with it
        setformData(f => ({ ...f, password: "" }))
        setFormErrors([])
    }

    // Create recommendation content:
    

    return (<>
        <Row className="CarbonForm">
            <h1>Retrive Carbon Emission Data - CPU</h1>
            <Col md="3"></Col>
            <Col md="6">
                <Form onSubmit={handleSubmit}>
                    <FormGroup >
                        <Label htmlFor="number" className="mr-md-2">Total CPU Load: </Label>
                        <Input
                            onChange={handleChange}
                            className="form-control input-md"
                            type="number"
                            value={number}
                            name="number"
                            id="number"
                            placeholder="Enter total CPU load" />
                    </FormGroup>
                    <FormGroup >
                        <Label htmlFor="time" className="mr-md-2">Time(hrs): </Label>
                        <Input
                            onChange={handleChange}
                            className="form-control input-md"
                            type="number"
                            value={time}
                            name="time"
                            id="time"
                            placeholder="Enter total CPU time in hours" />
                    </FormGroup>
                    <Button className="btn btn-default btn-md">Save</Button>
                </Form>
            </Col>
        </Row>
        <h2>Total Carbon Impact: {currCo2} kg CO2e</h2>
        <h2>Recommendations!</h2>
        <ol>
            <li>first</li>
            <li>first</li>
            <li>first</li>
            <li>first</li>
        </ol>
    </>
    );
}

export default CarbonForm;
