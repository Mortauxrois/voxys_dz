import { scheduleFactory } from './timeCore/timeCore';
import ScheduleChecker from './components/ScheduleChecker';
import './App.scss';

function App() {
  console.log(scheduleFactory())
  return (
    <div className='root'>
      <header>
        <h1>Расчет времени выхода</h1>
      </header>
      <main>
        <ScheduleChecker schedule={scheduleFactory()}/>
      </main>
    </div>
  );
}

export default App;
