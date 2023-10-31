import { Routes, Route, Link, Outlet } from "react-router-dom";
import "./App.css";
import Day12021 from "./2021/day1";
import Day22021 from "./2021/day2";
import Day32021 from "./2021/day3";
import Day42021 from "./2021/day4";
import Day102021 from "./2021/day10";
import Day112021 from "./2021/day11";
import days2022 from "./2022";
import days2023 from "./2023";

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
                <Link to="/">Home</Link>

                {years.map((year) => (
                    <details>
                        <summary>
                            <Link to={`/${year}`}>{year}</Link>
                        </summary>
                        <ul>
                            {days.map((day) => (
                                <li>
                                    <Link key={day} to={`/${year}/${day}`}>
                                        Day {day}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </details>
                ))}
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
        <h1>Advent of code</h1>
        <Routes>
            <Route path="/" element={<Layout years={[2015, 2021, 2022, 2023]} />}>
                <Route index element={<Home />} />
                <Route path="/2015">
                    {/* <Route index element={<Day12015 />} /> */}
                    {/* <Route path="day1" element={<Day12015 />} /> */}
                </Route>
                <Route path="/2021">
                    <Route index element={<Day12021 />} />
                    <Route path="day1" element={<Day12021 />} />
                    <Route path="day2" element={<Day22021 />} />
                    <Route path="day3" element={<Day32021 />} />
                    <Route path="day4" element={<Day42021 />} />
                    <Route path="day10" element={<Day102021 />} />
                    <Route path="day11" element={<Day112021 />} />
                </Route>
                <Route path="/2022">
                    <Route index element={days2022[0]} />
                    {days2022.map((Day, i) => (
                        <Route path={(i + 1).toString()} element={<Day />} />
                    ))}
                </Route>
                <Route path="/2023">
                    <Route index element={days2023[0]} />
                    {days2023.map((Day, i) => (
                        <Route path={(i + 1).toString()} element={<Day />} />
                    ))}
                </Route>
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    </div>
);

export default App;
