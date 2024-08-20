"use strict";

exports.getOverview = function (req, res) {
  res.status(200).render('overview', {
    title: 'All Tours'
  });
};

exports.getTour = function (req, res) {
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour'
  });
};