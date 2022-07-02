import { FC } from 'react';
import { XIcon } from '@heroicons/react/solid';
import Pill from '../Pill';

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
          <Pill color="blue">{title}</Pill>
          {totalWrong > 0 && (
            <span className="ml-1">
              <Pill color="red">
                <span className="flex items-center">
                  <XIcon className="w-3 h-3 text-red-800 inline" />
                  <span className="ml-1">{totalWrong} mistakes</span>
                </span>
              </Pill>
            </span>
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
