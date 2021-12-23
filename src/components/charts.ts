import {
  MONTH_GRAPH,
  DAYS_GRAPH,
  MONTH_GRAPH_CONTAINER,
  DAYS_GRAPH_CONTAINER,
} from '../constants';
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { getShortMonthName } from '../utils/time.utils';

export const renderMonthGraph = function (statement: any[]): void {
  Chart.register(LinearScale, CategoryScale, BarController, BarElement);

  const context: HTMLCanvasElement = createContext(
    MONTH_GRAPH_CONTAINER,
    MONTH_GRAPH
  );
  // prepare data for graph
  const earnings: object = statement.map((item) => item.earnings);
  const labels: string[] = statement.map((item) =>
    getShortMonthName(item.month)
  );

  new Chart(context, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Earnings $',
          data: earnings,
          backgroundColor: 'rgba(2, 184, 41, 0.5)',
          borderColor: 'rgba(2, 184, 41, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Months',
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Earnings $',
          },
          beginAtZero: true,
        },
      },
    },
  });
};

export const renderDaysGraph = function (statement: object): void {
  Chart.register(
    LinearScale,
    CategoryScale,
    LineController,
    LineElement,
    PointElement,
    Tooltip
  );

  const context: HTMLCanvasElement = createContext(
    DAYS_GRAPH_CONTAINER,
    DAYS_GRAPH
  );

  // prepare data for graph
  const entries = Object.entries(statement);

  const labels = entries.map(([date, _]) => date);
  const orders = entries.map(([_, amount]) => amount);

  new Chart(context, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Earnings $',
          data: orders,
          backgroundColor: 'rgba(2, 99, 132, 0.15)',
          borderColor: 'rgba(2,99,132,1)',
          borderWidth: 3,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: ' ',
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Days',
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Earnings $',
          },
          beginAtZero: true,
        },
      },
    },
  });
};

const createContext = function (
  container: string,
  id: string
): HTMLCanvasElement {
  let context = document.getElementById(id) as HTMLCanvasElement;

  // remove canvas if exist
  if (typeof context !== 'undefined' && context !== null) {
    document.getElementById(id).remove();
  }

  // create a new canvas
  const canvas = document.createElement('canvas') as HTMLCanvasElement;
  canvas.setAttribute('id', id);

  document.getElementById(container).appendChild(canvas);
  context = document.getElementById(id) as HTMLCanvasElement;

  return context;
};
