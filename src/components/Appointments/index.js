import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import {
  Container, Left, Avatar, Info, Name, Time,
} from './styles';

export default function Appointments({ data, onCancel }) {
  const dateParse = useMemo(() => formatRelative(parseISO(data.date), new Date(), {
    locale: pt,
    addSuffix: true,
  }), [data.date]);
  console.tron.log(data);
  return (
    <Container past={data.past}>
      <Left>
        <Avatar source={{
          uri:
          data.provider.avatar ? data.provider.avatar.url : `https://api.adorable.io/avatar/50/${data.provider.name}.png`,
        }}
        />
        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{dateParse}</Time>
        </Info>
      </Left>

      {data.cancelable && !data.canceled_at && (
      <TouchableOpacity onPress={onCancel}>
        <Icon name="event-busy" size={20} color="#f64c75" />
      </TouchableOpacity>
      )}


    </Container>
  );
}

Appointments.propTypes = {
  onCancel: PropTypes.func.isRequired,
  data: PropTypes.shape({
    date: PropTypes.string,
    past: PropTypes.bool,
    cancelable: PropTypes.bool,
    canceled_at: PropTypes.string,
    provider: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
  }).isRequired,
};
