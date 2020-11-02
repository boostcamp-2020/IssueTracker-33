import NewIssueDropdown from './NewIssueDropdown'
import React, { Fragment, useEffect, useState } from 'react';
import axios from "axios";

const NewIssueOption = () => {
    useEffect( async ()=> {
        const URL1 = "http://localhost:3000/labels"
        const URL2 = "http://localhost:3000/milestones"
        const URL3 = "http://localhost:3000/users"
  
        const promise1 = axios.get(URL1)
        const promise2 = axios.get(URL2)
        const promise3 = axios.get(URL3)
  
        const results = await Promise.all([promise1,promise2,promise3])
  
        console.log(results)
    }, [])

    return (
        <div>
        <NewIssueDropdown dropdownTitle="Assignees"></NewIssueDropdown>
            <NewIssueDropdown dropdownTitle="Labels"></NewIssueDropdown>
            <NewIssueDropdown dropdownTitle="Milestones"></NewIssueDropdown>
        </div>
    );
};

export default NewIssueOption;