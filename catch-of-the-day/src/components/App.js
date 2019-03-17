import React from 'react'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import sampleFishes from '../sample-fishes'
import Fish from "./Fish"
import base from "../base"
require('dotenv').config()

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    }

    componentDidMount() {
        // first reinstate local storage
        const { params } = this.props.match
        const localStorageRef = localStorage.getItem(params.storeId)

        if (localStorageRef) {
            this.setState ({ order: JSON.parse(localStorageRef)})
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        })
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    }

    componentWillUnmount() {
        base.removeBinding(this.ref)
    }

    addFish = (fish) => {
        // copy state
        const fishes = { ...this.state.fishes }
        // add fish to the existing state
        fishes[`fish${Date.now()}`] = fish
        // set new fishes object to state
        this.setState({ fishes })
    }

    updateFish = (key, updatedFish) => {
        // 1. Take a copy of the current state
        const fishes = { ...this.state.fishes }
        // 2. Update that state
        fishes[key] = updatedFish
        // 3. Set that to state
        this.setState({ fishes })
    }

    deleteFish = (key) => {
        // 1. take a copy of state
        const fishes = { ...this.state.fishes }
        // 2. update state (changing to null means Firebase picks up the deletion)
        fishes[key] = null
        // 3.
        this.setState ({ fishes })

    }

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes })
    }

    addToOrder = (key) => {
        const order = {...this.state.order}
        order[key] = order[key] + 1 || 1
        this.setState ({ order })
    }

    removeFromOrder = (key) => {
        const order = {...this.state.order}
        delete order[key]
        this.setState ({ order })
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                <Header tagline="Fresh Food Market"/>
                <ul className="fishes">
                {Object.keys(this.state.fishes).map(key => (
                    <Fish key={key}
                    details={this.state.fishes[key]}
                    addToOrder = {this.addToOrder}
                    index = {key} />
                ))}
                </ul>
                </div>
                <Order fishes={this.state.fishes}
                order={this.state.order}
                removeFromOrder = {this.removeFromOrder}/>

                <Inventory
                addFish = {this.addFish}
                updateFish = {this.updateFish}
                deleteFish = {this.deleteFish}
                loadSampleFishes = {this.loadSampleFishes}
                fishes = {this.state.fishes}
                />
            </div>
        )
    }
}

export default App;