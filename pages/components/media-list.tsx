import { GridList, GridListTile, GridListTileBar, ListSubheader } from '@material-ui/core';
import { IMedia } from '../types/media';

interface IMediaListProps {
  data: Array<IMedia>;
}

const NUM_COLUMNS: number = 2;

const MediaList = ({ data }: IMediaListProps) => {
  return (
    <GridList cellHeight={160} cols={NUM_COLUMNS}>
      {data.map((tile: IMedia) => (
        <GridListTile key={tile.id}>
          <img src={tile.bannerImage} alt={tile.title.english || ''} />
          <GridListTileBar title={tile.title.english} subtitle={tile.description} />
        </GridListTile>
      ))}
    </GridList>
  );
};

export default MediaList;
