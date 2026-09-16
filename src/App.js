// State Hook
import StateEx01 from "./exercises/use-state/Exercise1";
import StateEx02 from "./exercises/use-state/Exercise2";
import StateEx03 from "./exercises/use-state/Exercise3";
import StateEx04 from "./exercises/use-state/Exercise4";
import StateEx05 from "./exercises/use-state/Exercise5";

// Effect Hook
import EffectEx01 from "./exercises/use-effect/Exercise1";
import EffectEx02 from "./exercises/use-effect/Exercise2";
import EffectEx03 from "./exercises/use-effect/Exercise3";

const data = [
   {
      lesson: "Lesson I: State Hook (useState())",
      exs: [
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
      ],
   },
   {
      lesson: "Lesson II: Effect Hook (useEffect())",
      exs: [
         {
            id: "ex1",
            label: "Exercises 1: Đồng bộ Tiêu đề trang (Document Title) & Lắng nghe phím tắt",
            component: <EffectEx01 />,
         },
         {
            id: "ex2",
            label: "Exercises 2: Đồng hồ đếm ngược (Countdown Timer)",
            component: <EffectEx02 />,
         },
         {
            id: "ex3",
            label: "Fetch dữ liệu & Xử lý 3 trạng thái (Loading - Error - Data)",
            component: <EffectEx03 />,
         },
      ],
   }
];

function App() {
   return (
      <div className="App">
         <header className="App-header">
            <h1 style={{ textAlign: "center" }}>Learning React JS with me</h1>
         </header>
         <main className="App-body" style={{ padding: "15px 30px" }}>
            {data.map((value) => {
               return (
                  <div key={value.lesson}>
                     <h2>{value.lesson}</h2>
                     <div>
                        {value.exs.map((ex) => {
                           return (
                              <div key={ex.id} style={{ paddingInline: 45 }}>
                                 <h3>{ex.label}</h3>
                                 {ex.component}
                              </div>
                           );
                        })}
                     </div>
                  </div>
               );
            })}
         </main>
      </div>
   );
}

export default App;
