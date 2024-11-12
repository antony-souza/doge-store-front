import { IStore, IUpdateStore } from "./interfaces-global.service";
import moment from 'moment';

interface IHour extends Partial<IStore> {
    open_time: string;
    close_time: string;
}

const checkHour = ({ open_time, close_time }: IHour) => {
    const open = moment(open_time, 'HH:mm');
    const close = moment(close_time, 'HH:mm');
    const now = moment();

    if (close.isBefore(open)) {

        return now.isAfter(open) || now.isBefore(close);
    }

    return now.isBetween(open, close);
};

export default checkHour;