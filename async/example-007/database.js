'use strict';

var reservations = {
  '15A': {
    name: 'Tim Ambler'
  },
  '22B': {
    name: 'Ryan Conaway'
  },
  '32K': {
    name: 'Mike Hostetler'
  }
};

function isSeatOpen(reservation) {
  return Object.keys(reservations)
    .indexOf(reservation.seat) < 0;
}

module.exports = {
  reservation: {
    create: function (reservation) {
      if (!isSeatOpen(reservation)) {
        throw new Error('seat already taken');
      }
      reservations[reservation.seat] = reservation;
    }
  }
};