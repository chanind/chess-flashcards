import { FC } from 'react';
import { XIcon } from '@heroicons/react/solid';

export interface ProgressBarProps {
  percent: number;
  label: string;
  title: string;
  totalWrong: number;
}

const ProgressBar: FC<ProgressBarProps> = ({
  title,
  percent,
  label,
  totalWrong,
}) => (
  <div className="relative pt-1">
    <div className="flex mb-2 items-center justify-between">
      <div>
        <div className="flex items-center">
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
            {title}
          </span>
          {totalWrong > 0 && (
            <div className="ml-3 text-xs font-semibold text-red-500 flex items-center">
              <span className="mr-1">{totalWrong}</span>{' '}
              <XIcon className="w-5 h-5 text-red-500 inline" />
            </div>
          )}
        </div>
      </div>
      <div className="text-right">
        <span className="text-xs font-semibold inline-block text-blue-600">
          {label}
        </span>
      </div>
    </div>
    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
      <div
        style={{ width: `${percent}%` }}
        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
      ></div>
    </div>
  </div>
);

export default ProgressBar;
