import { Routes, Route, Link, Outlet } from "react-router-dom";
import "./App.css";
import days2015 from "./2015";
import days2017 from "./2017";
import days2021 from "./2021";
import days2022 from "./2022";
import days2023 from "./2023";
import days2024 from "./2024";
import days2025 from "./2025";

import { FC, Fragment } from "react";

// this can probably be a map as well
const yearsAndDays: Record<number, (() => JSX.Element)[]> = {
	2015: days2015,
	2017: days2017,
	2021: days2021,
	2022: days2022,
	2023: days2023,
	2024: days2024,
	2025: days2025,
};

const allYears = Object.keys(yearsAndDays).map(Number);

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

// these variables prevent new memory allocations
const normalDaysPerYear = Array.from({ length: 25 }).map((_, i) => i + 1);
const daysIn2025 = Array.from({ length: 12 }).map((_, i) => i + 1);

const days = (year: number) => (year === 2025 ? daysIn2025 : normalDaysPerYear);

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
							{days(year).map((day) => (
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
			<Route path="/" element={<Layout years={allYears} />}>
				<Route index element={<Home />} />

				{allYears.map((year) => (
					<Route path={`/${year}`}>
						{yearsAndDays[year]?.map((Day, i) => (
							<Route
								path={(i + 1).toString()}
								element={
									<Fragment>
										<Day />
										<a href={`https://adventofcode.com/${year}/day/${i + 1}`}>
											Link to advent of code
										</a>
									</Fragment>
								}
							/>
						))}
					</Route>
				))}

				<Route path="*" element={<NoMatch />} />
			</Route>
		</Routes>
	</div>
);

export default App;
