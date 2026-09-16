import StateEx01 from "./exercises/use-state/Exercise1";
import StateEx02 from "./exercises/use-state/Exercise2";
import StateEx03 from "./exercises/use-state/Exercise3";
import StateEx04 from "./exercises/use-state/Exercise4";
import StateEx05 from "./exercises/use-state/Exercise5";


const exercises = [
   {
      id: "ex1",
      label: "Exercises 1: Tab Navigation",
      component: <StateEx01 />,
   },
   {
      id: "ex2",
      label: "Exercises 2: Product Filter",
      component: <StateEx02 />,
   },
   {
      id: "ex3",
      label: "Exercises 3: Multi-step Registration Form",
      component: <StateEx03 />,
   },
   {
      id: "ex4",
      label: "Bài 4: Shopping Cart",
      component: <StateEx04 />,
   },
   {
      id: "ex5",
      label: "Bài 5: Task & Bug Tracker",
      component: <StateEx05 />,
   },
];

function App() {
   return (
      <div className="App">
         <header className="App-header">
            <h1 style={{ textAlign: "center" }}>Learning React JS with me</h1>
         </header>
         <main className="App-body" style={{padding: '15px 30px', }}>
            <h2>Topic I: State Hook (useState())</h2>
            {exercises.map((exercise) => {
               return (
                  <div key={exercise.id} style={{paddingInline: 45}}>
                     <h3>{exercise.label}</h3>
                     {exercise.component}
                  </div>
               );
            })}
         </main>
      </div>
   );
}

export default App;
