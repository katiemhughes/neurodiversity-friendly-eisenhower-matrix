import { mdiHeadHeart, mdiHeadMinus } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import MatrixForm from '../MatrixForm/MatrixForm';
import MatrixItems from '../MatrixItems/MatrixItems';

export interface Quadrants {
  [key: string]: string[];
}

export interface Item {
  [key: string]: string;
}

interface MatrixQuadrantProps {
  items: Item;
  quadrants: Quadrants;
  addItem: (
    quadrantKey: string,
    event: React.FormEvent<HTMLFormElement>,
  ) => void;
  handleQuadrantInputChange: (
    quadrantKey: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  deleteItem: (quadrantKey: string, deletedItemIndex: number) => void;
  lowBatteryIcon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  fullBatteryIcon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}

const MatrixQuadrant: React.FC<MatrixQuadrantProps> = ({
  items,
  quadrants,
  addItem,
  handleQuadrantInputChange,
  deleteItem,
  lowBatteryIcon,
  fullBatteryIcon,
}) => {
  const replaceQuadrantKeyWithTitle = (quadrantKey: string) => {
    switch (quadrantKey) {
      case 'quadrant1':
        return 'High Interest / High Energy';
      case 'quadrant2':
        return 'High Interest / Low Energy';
      case 'quadrant3':
        return 'Low Interest / High Energy';
      case 'quadrant4':
        return 'Low Interest / Low Energy';
      default:
        return '';
    }
  };

  const replaceQuadrantKeyWithHeadIcon = (quadrantKey: string) => {
    switch (quadrantKey) {
      case 'quadrant1':
        return mdiHeadHeart;
      case 'quadrant2':
        return mdiHeadHeart;
      case 'quadrant3':
        return mdiHeadMinus;
      case 'quadrant4':
        return mdiHeadMinus;
      default:
        return '';
    }
  };

  const replaceQuadrantKeyWithBatteryIcon = (quadrantKey: string) => {
    switch (quadrantKey) {
      case 'quadrant1':
        return fullBatteryIcon;
      case 'quadrant2':
        return lowBatteryIcon;
      case 'quadrant3':
        return fullBatteryIcon;
      case 'quadrant4':
        return lowBatteryIcon;
      default:
        return '';
    }
  };

  return (
    <>
      {Object.keys(quadrants).map((quadrantKey, quadrantIndex) => (
        <section className="matrix__category" key={quadrantKey}>
          <div className="matrix__category--header">
            <h2 className="matrix__heading">
              {replaceQuadrantKeyWithTitle(quadrantKey)}
            </h2>
            <div className="matrix__icons">
              <Icon
                className="matrix__icon--head"
                path={replaceQuadrantKeyWithHeadIcon(quadrantKey)}
                title={replaceQuadrantKeyWithTitle(quadrantKey)
                  .split('/')[0]
                  .trim()}
                size={1.8}
              />
              {replaceQuadrantKeyWithBatteryIcon(quadrantKey)}
            </div>
          </div>
          <MatrixForm
            items={items}
            quadrantKey={quadrantKey}
            quadrantIndex={quadrantIndex}
            addItem={addItem}
            handleQuadrantInputChange={handleQuadrantInputChange}
          />
          <MatrixItems
            items={items}
            quadrants={quadrants}
            quadrantKey={quadrantKey}
            quadrantIndex={quadrantIndex}
            deleteItem={deleteItem}
          />
        </section>
      ))}
    </>
  );
};

export default MatrixQuadrant;
