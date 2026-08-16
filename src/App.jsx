import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./App.css";

const data = {
  "III": {
    Reading: {
      2014: { national: 23.6, govt: 19.5, private: 38.3, rajasthan: 17.4 },
      2016: { national: 25.2, govt: 21.2, private: 39.2, rajasthan: 19.2 },
      2018: { national: 27.3, govt: 23.4, private: 40.0, rajasthan: 21.3 },
      2022: { national: 20.5, govt: 17.5, private: 34.5, rajasthan: 18.0 },
      2024: { national: 27.1, govt: 23.4, private: 35.5, rajasthan: 20.1 },
    },
    Arithmetic: {
      2014: { national: 25.4, govt: 21.2, private: 39.8, rajasthan: 16.7 },
      2016: { national: 27.7, govt: 23.7, private: 42.0, rajasthan: 18.8 },
      2018: { national: 28.2, govt: 24.5, private: 42.6, rajasthan: 21.7 },
      2022: { national: 25.9, govt: 21.7, private: 40.5, rajasthan: 18.3 },
      2024: { national: 33.7, govt: 27.6, private: 47.5, rajasthan: 20.1 },
    },
  },
  "V": {
    Reading: {
      2014: { national: 48.8, govt: 43.1, private: 62.3, rajasthan: 42.2 },
      2016: { national: 47.1, govt: 41.8, private: 60.4, rajasthan: 40.1 },
      2018: { national: 50.3, govt: 44.2, private: 63.8, rajasthan: 43.5 },
      2022: { national: 42.8, govt: 37.3, private: 55.4, rajasthan: 39.0 },
      2024: { national: 48.8, govt: 44.8, private: 59.3, rajasthan: 43.7 },
    },
    Arithmetic: {
      2014: { national: 36.6, govt: 31.0, private: 50.2, rajasthan: 32.8 },
      2016: { national: 37.1, govt: 32.0, private: 50.4, rajasthan: 31.5 },
      2018: { national: 36.8, govt: 31.8, private: 50.0, rajasthan: 31.9 },
      2022: { national: 25.9, govt: 22.0, private: 39.0, rajasthan: 25.2 },
      2024: { national: 30.7, govt: 26.5, private: 41.8, rajasthan: 28.5 },
    },
  },
};

const years = [2014, 2016, 2018, 2022, 2024];

function App() {
  const [year, setYear] = useState(2024);
  const [grade, setGrade] = useState("III");
  const [subject, setSubject] = useState("Reading");

  const selected = data[grade][subject][year];

  const trendData = useMemo(
    () =>
      years.map((y) => ({
        year: y,
        national: data[grade][subject][y].national,
        rajasthan: data[grade][subject][y].rajasthan,
      })),
    [grade, subject]
  );

  const schoolGap = selected.private - selected.govt;
  const stateGap = selected.national - selected.rajasthan;

  let insight = "";

  if (subject === "Arithmetic" && grade === "III") {
    insight =
      "Grade III Arithmetic is a priority area. The 2024 government-private gap is 19.9 percentage points.";
  } else if (subject === "Reading" && grade === "III") {
    insight =
      "Grade III Reading improved in 2024, but the achievement level remains low, making foundational reading a priority.";
  } else if (subject === "Reading") {
    insight =
      "Reading performance is substantially higher in Grade V than Grade III, but differences between school types remain visible.";
  } else {
    insight =
      "Arithmetic outcomes vary across grades and years. Comparing school type and geography helps identify where targeted support is needed.";
  }

  return (
    <div className="app">
      <header>
        <div>
          <p className="eyebrow">EDUCATION INSIGHT PLATFORM</p>
          <h1>Learning Outcomes Insight Platform</h1>
          <p className="subtitle">
            Explore learning outcomes across years, grades, subjects and school
            types.
          </p>
        </div>
        <div className="status">ASER DATA ANALYSIS</div>
      </header>

      <main>
        <section className="controls">
          <div>
            <label>Year</label>
            <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
              {years.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Grade</label>
            <select value={grade} onChange={(e) => setGrade(e.target.value)}>
              <option>III</option>
              <option>V</option>
            </select>
          </div>

          <div>
            <label>Subject</label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option>Reading</option>
              <option>Arithmetic</option>
            </select>
          </div>
        </section>

        <section className="hero">
          <div>
            <p className="muted">Selected learning outcome</p>
            <h2>
              Grade {grade} · {subject}
            </h2>
            <p>
              Percentage of students achieving the selected learning outcome
              in {year}.
            </p>
          </div>
          <div className="hero-value">{selected.national}%</div>
        </section>

        <section className="cards">
          <div className="metric">
            <span>National</span>
            <strong>{selected.national}%</strong>
          </div>

          <div className="metric">
            <span>Government Schools</span>
            <strong>{selected.govt}%</strong>
          </div>

          <div className="metric">
            <span>Private Schools</span>
            <strong>{selected.private}%</strong>
          </div>

          <div className="metric">
            <span>Rajasthan</span>
            <strong>{selected.rajasthan}%</strong>
          </div>
        </section>

        <section className="grid">
          <div className="panel chart-panel">
            <div className="panel-heading">
              <div>
                <h3>Learning Trend</h3>
                <p>National vs Rajasthan</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={270}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="national"
                  name="National"
                  stroke="#2b61a6"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="rajasthan"
                  name="Rajasthan"
                  stroke="#3f8b63"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="panel">
            <div className="panel-heading">
              <div>
                <h3>School Type Gap</h3>
                <p>{year} comparison</p>
              </div>
              <span className="gap">{schoolGap.toFixed(1)} pp</span>
            </div>

            <div className="comparison">
              <div>
                <span>Government</span>
                <div className="bar">
                  <i style={{ width: `${selected.govt}%` }} />
                </div>
                <strong>{selected.govt}%</strong>
              </div>

              <div>
                <span>Private</span>
                <div className="bar">
                  <i style={{ width: `${selected.private}%` }} />
                </div>
                <strong>{selected.private}%</strong>
              </div>
            </div>

            <p className="explanation">
              Private-school achievement is {schoolGap.toFixed(1)} percentage
              points higher for the selected indicator.
            </p>
          </div>
        </section>

        <section className="insight">
          <div className="insight-icon">!</div>
          <div>
            <p className="eyebrow">PRIORITY INSIGHT</p>
            <h3>{insight}</h3>
            <p>
              Rajasthan is {stateGap.toFixed(1)} percentage points below the
              national value for the current selection.
            </p>
          </div>
        </section>

        <section className="product">
          <div>
            <p className="eyebrow">PRODUCT DIRECTION</p>
            <h2>From data to targeted action</h2>
            <p>
              Education teams can use the platform to identify priority
              learning gaps, compare performance and monitor changes over time.
            </p>
          </div>

          <div className="product-features">
            <span>Trend Monitoring</span>
            <span>Gap Identification</span>
            <span>Data-driven Prioritisation</span>
          </div>
        </section>
      </main>

      <footer>
        Learning Outcomes Insight Platform · Flexera Round 1 Prototype
      </footer>
    </div>
  );
}

export default App;