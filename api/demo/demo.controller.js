const changeCase = require('change-case');
const Demo = require('../../models').Demo; // eslint-disable-line prefer-destructuring

const createDemo = (req, res) => {
  const { demo } = req.body;
  const demoTitle = demo.demoTitle ? demo.demoTitle.trim() : null;
  const demoSlug = `${changeCase.paramCase(demoTitle)}-${Date.now()}`;
  const demoText = demo.demoText ? demo.demoText.trim() : null;
  const demoDate = demo.demoDate ? demo.demoDate : new Date();

  const newDemo = {
    demoTitle,
    demoSlug,
    demoText,
    demoDate,
  };

  if (!newDemo.demoTitle) {
    return res.status(422).send({
      error: 'A demoTitle is required.',
    });
  }

  Demo.create(newDemo)
    .then(demo => res.json({ demo }))
    .catch(err => res.status(400).send({
      error: err.errors,
    }));
};

function getAllDemos(req, res) {
  Demo.findAll()
    .then(demos => res.json({ demos }))
    .catch(err => res.status(400).send({
      error: err.message,
    }));
}

function getDemo(req, res) {
  const { id } = req.params;
  Demo.findOne({
    where: { id },
  })
    .then((demo) => {
      if (!demo) {
        return res.status(400).send({
          error: 'No demo found.',
        });
      }
      return res.json({ demo });
    })
    .catch(err => res.status(400).send({
      error: err.message,
    }));
}

function updateDemo(req, res) {
  const { id } = req.params;
  const demoBody = req.body.demo;

  Demo.findOne({
    where: { id },
  })
    .then((demo) => {
      if (!demo) {
        return res.status(404).send({
          error: 'No demo found.',
        });
      }

      // Update the demo slug based on the title if title is new
      const demoTitle = demoBody.demoTitle ? demoBody.demoTitle.trim() : null;
      if (demoBody.demoTitle && !demo.dataValues.demoSlug.includes(`${changeCase.paramCase(demoTitle)}`)) {
        const slug = demoTitle ? `${changeCase.paramCase(demoTitle)}-${Date.now()}` : null;
        demoBody.demoSlug = slug;
      }

      demo.updateAttributes(demoBody)
        .then(() => demo.save())
        .then(demo => res.json({ demo }))
        .catch(err => res.status(400).send({
          error: err.message,
        }));
    })
    .catch(err => res.status(400).send({
      error: err.message,
    }));
}

// Delete one demo
function deleteDemo(req, res) {
  const { id } = req.params;
  Demo.findOne({ where: { id } })
    .then((demo) => {
      demo.destroy()
        .then(() => {
          res.status(200).send({
            success: 'Demo successfully deleted.',
          });
        });
    })
    .catch(err => res.status(400).send({
      error: err.message,
    }));
}

module.exports = {
  createDemo,
  getAllDemos,
  getDemo,
  updateDemo,
  deleteDemo,
};
