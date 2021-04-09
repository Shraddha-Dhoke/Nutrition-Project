import React, { Component } from 'react'

export default class Food extends Component {
    disabled = true;
    constructor(props) {
        super(props);
        this.state = {
            foods: [],
            searchedFoods: [],
            currentFood: {
                name: "Nutrition Value",
                weight: 100,
                calories: 0,
                fats: 0,
                carbs: 0,
                protein: 0,
                fiber: 0,
                sugar: 0
            }
        }
    }

    componentDidMount() {
        fetch("http://localhost:3200/foods")
            .then((response => response.json()))
            .then((foodRes) => {
                console.log(foodRes);
                this.setState({ foods: foodRes.foods });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    searchFood(value) {
        if (value !== "") {
            let searchedFoodsArr = this.state.foods.filter((food, index) => {
                return food.name.toLowerCase().startsWith(value.toLowerCase());
            })
            this.setState({ searchedFoods: searchedFoodsArr });
        } else {
            this.setState({ searchedFoods: [] });
        }
    }

    selectedFood(food) {
        this.setState({ currentFood: food });
        this.disabled = false;
    }

    changeWeight(weight) {
        let currFood = this.state.currentFood;
        if (weight !== "" && weight !== 0) {
            currFood.calories = (currFood.calories * weight) / currFood.weight;
            currFood.fats = (currFood.fats * weight) / currFood.weight;
            currFood.carbs = (currFood.carbs * weight) / currFood.weight;
            currFood.protein = (currFood.protein * weight) / currFood.weight;
            currFood.fiber = (currFood.fiber * weight) / currFood.weight;
            currFood.sugar = (currFood.sugar * weight) / currFood.weight;
            currFood.weight = weight;

            this.setState({ currentFood: currFood })
    }
    }

    render() {
        return (
            <div className="container-fluid">
                <header className="Header">
                    <h1>Nutrition Information</h1>
                </header>
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <div className="form-group" style={{ marginTop: "30px" }}>
                            <input className="form-control" onChange={(event) => {
                                this.searchFood(event.target.value)
                            }} placeholder="Search Food" />
                        </div>
                        <div className="searchResult">
                            {
                                this.state.searchedFoods.map((food, index) => (
                                    <div className="result" onClick={() => {
                                        this.selectedFood(food);
                                    }} key={index}>
                                        {food.name}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="offset-md-4 col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">{this.state.currentFood.name}</h3>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-3">Weight</div>
                                            <div className="col-6">
                                                : <input type="text"
                                                    disabled={this.disabled}
                                                    defaultValue={this.state.currentFood.weight}
                                                    onChange={(event) => {
                                                        this.changeWeight(Number(event.target.value))
                                                    }} style={{ width: "80%" }} />
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-3">Calories</div>
                                            <div className="col-9">: {this.state.currentFood.calories.toFixed(2)} cal</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-3">Fats</div>
                                            <div className="col-9">: {this.state.currentFood.fats.toFixed(2)} g</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-3">Carbs</div>
                                            <div className="col-9">: {this.state.currentFood.carbs.toFixed(2)} g</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-3">Protein</div>
                                            <div className="col-9">: {this.state.currentFood.protein.toFixed(2)} g</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-3">Fiber</div>
                                            <div className="col-9">: {this.state.currentFood.fiber.toFixed(2)} g</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-3">Sugar</div>
                                            <div className="col-9">: {this.state.currentFood.sugar.toFixed(2)} g</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
