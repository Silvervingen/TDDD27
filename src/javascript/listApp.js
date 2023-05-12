/*
import StartFirebase from './firestore2';
import React from 'react';
import {ref, onValue} from 'firebase2/database';
import {Table} from 'react-bootstrap'

const db = StartFirebase();

export class RealtimeData extends React.Component{
    constructor (){
        super();
        this.state = {
            tableData: []
        }
    }

    componentDidMount(){
        const dbRef= ref(db, 'Customer');
        onValue(dbref, (snapshot)=> {
        let records =[];
        snapshot.forEach(childSnapshot=>{
            let keyName = childSnapshot.key;
            let data = childSnapshot.val()
            records.push({"key":keyName, "data":data});
        }) ;
        this.setState({tableData : records});
    });
    }

    render(){
        return(
            <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Game</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.tableData.map((row,index)=> {
                            return(
                                <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{index}</td>
                                </tr>
                            )
                        })}
                    </tbody>
            </Table>

        )
    }
}*/