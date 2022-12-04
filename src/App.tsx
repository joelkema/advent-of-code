import { Routes, Route, Link, Outlet } from "react-router-dom";
import "./App.css";
import { default as Day12021 } from "./2021/day1";
import { default as Day22021 } from "./2021/day2";
import { default as Day32021 } from "./2021/day3";
import { default as Day42021 } from "./2021/day4";
import { default as Day102021 } from "./2021/day10";
import { default as Day112021 } from "./2021/day11";
import { default as Day12022 } from "./2022/day1";
import { default as Day22022 } from "./2022/day2";
import { default as Day32022 } from "./2022/day3";
import { default as Day42022 } from "./2022/day4";
import { FC } from "react";

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

type LayoutProps = {
    years: number[];
};

const Layout: FC<LayoutProps> = ({ years }) => (
    <div className="wrapper">
        <div className="sidebar">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {years.map((year) => (
                        <>
                            <li>
                                <Link to={`/${year}`}>{year}</Link>
                            </li>
                            <ul>
                                {days.map((day) => (
                                    <li>
                                        <Link key={day} to={`/${year}/day${day}`}>
                                            Day {day}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ))}
                </ul>
            </nav>
        </div>
        <Outlet />
    </div>
);

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
            <Route path="/" element={<Layout years={[2021, 2022]} />}>
                <Route index element={<Home />} />
                <Route path="/2021/day1" element={<Day12021 />} />
                <Route path="/2021/day2" element={<Day22021 />} />
                <Route path="/2021/day3" element={<Day32021 />} />
                <Route path="/2021/Day4" element={<Day42021 />} />
                <Route path="/2021/day10" element={<Day102021 />} />
                <Route path="/2021/day11" element={<Day112021 />} />
                <Route path="/2022/day1" element={<Day12022 />} />
                <Route path="/2022/day2" element={<Day22022 />} />
                <Route path="/2022/day3" element={<Day32022 />} />
                <Route path="/2022/day4" element={<Day42022 />} />
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    </div>
);

export default App;
