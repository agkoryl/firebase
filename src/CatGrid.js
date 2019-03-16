import React, { Component } from 'react';

import { db } from './firebase';
//losuje jakies randomowe dane
import faker from 'faker';
import './CatGrid.css';

class CatGrid extends Component {

    state = {
        cats: []
    }

    componentDidMount() {


        //pobieramy dane z internetu
        // const headers = {
        //     'x-api-key': 'd24b427d-578e-4609-86bd-b36555c3875c'
        // }
        // fetch('https://api.thecatapi.com/v1/images/search?limit=10', { headers })
        //     .then(response => response.json())
        //     .then(data => {
        //         data.forEach(element => {

        //             db.ref('/cats/').push({
        //                 name: faker.name.firstName(), id: element.id,
        //                 url: element.url
        //             });
        //         });


        //     });

        //pobieramy dane z firebase
        db.ref('/cats/').once('value', (snapshot) => {
            const cats = [];
            Object.entries(snapshot.val()).forEach(elem => {
                const cat = {
                    id: elem[0],
                    ...elem[1]
                }
                cats.push(cat);
            });
            this.setState({ cats });
        });
    }

    render() {
        const { cats } = this.state;
        return (
            <div className="table-container">
                <table className="greyGridTable">
                    <tbody>
                    {cats.map(cat => (
                        <tr key={cat.id}>
                            <td style={{fontSize: 20}}>{cat.name}</td>
                            <td><img src={cat.url} style={{ width: "200px", height: "150px", overflow: "hidden" }}></img></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CatGrid;

