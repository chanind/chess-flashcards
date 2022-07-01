import { FC } from 'react';

interface StudyCompleteProps {
  totalRounds: number;
  totalMistakes: number;
  onStudyAgain: () => void;
}

const StudyComplete: FC<StudyCompleteProps> = ({
  totalRounds,
  totalMistakes,
  onStudyAgain,
}) => {
  const text = totalMistakes == 0 ? 'Perfect score!' : 'Nice Job!';
  return (
    <div>
      <h1 className="text-2xl">🎉 {text}</h1>
      <div className="mt-2">
        <span className="mr-2 text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
          {totalRounds} Rounds
        </span>
        <span className="mr-2 text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
          {totalMistakes} Mistakes
        </span>
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="text-white bg-blue-600 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center mt-4"
          onClick={onStudyAgain}
        >
          Study Again
        </button>
      </div>
    </div>
  );
};

export default StudyComplete;
