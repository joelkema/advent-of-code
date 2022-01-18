import { Routes, Route, Link, Outlet } from "react-router-dom";
import "./App.css";
import Day1 from "./day1";
import Day2 from "./day2";
import Day3 from "./day3";
import Day4 from "./day4";
import Day10 from "./day10";
import Day11 from "./day11";

const Home = () => (
    <main>
        <h2>Welcome to the homepage!</h2>
        <p>
            Advent of Code is an Advent calendar of small programming puzzles for a variety of skill sets and skill
            levels that can be solved in any programming language you like. People use them as a speed contest,
            interview prep, company training, university coursework, practice problems, or to challenge each other.
        </p>
    </main>
);

const days = [...Array(24)].map((u, i) => i + 1);

const Layout = () => {
    return (
        <div className="wrapper">
            <div className="sidebar">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {days.map((day) => (
                            <li>
                                <Link key={day} to={`/day${day}`}>
                                    Day {day}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <Outlet />
        </div>
    );
};

const NoMatch = () => (
    <div>
        <h2>Nothing to see here!</h2>
        <p>
            <Link to="/">Go to the home page</Link>
        </p>
    </div>
);

const App = () => (
    <div className="App">
        <h1>Advent of code 2021</h1>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="day1" element={<Day1 />} />
                <Route path="day2" element={<Day2 />} />
                <Route path="day3" element={<Day3 />} />
                <Route path="Day4" element={<Day4 />} />
                <Route path="day10" element={<Day10 />} />
                <Route path="day11" element={<Day11 />} />
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    </div>
);

export default App;
