import { message } from 'antd';
import { DataService } from '../config/dataService/dataService';

/**
 * Return ellipsis of a given string
 * @param {string} text
 * @param {number} size
 */
const ellipsis = (text, size) => {
  return `${text.split(' ').slice(0, size).join(' ')}...`;
};

const idGenerator = (events, length = 1) => {
  const arrayData = [];
  events.map((data) => {
    return arrayData.push(parseInt(data.id, 10));
  });
  const number = (Math.max(...arrayData) + 1).toString();
  return number.length < length ? `${'0'.repeat(length - number.length)}${number}` : number;
};

const updateStatus = ({ url, data }) => {
  DataService.post(url, data)
    .then((res) => {
      message.success('Status berhasil diupdate');
    })
    .catch((err) => {
      message.error('Status gagal diupdate');
    });
};

function formatNumber(number, prefix = null) {
  // change number format it's number greater than 0
  if (number > 0) {
    const format = parseInt(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    if (prefix) {
      return `${prefix} ${format}`;
    }
    return format;
  } else {
    return 0;
  }
}

export { ellipsis, idGenerator, updateStatus, formatNumber };
