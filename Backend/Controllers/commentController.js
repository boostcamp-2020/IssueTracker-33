const { updateCommentById, createCommentAndGetIt } = require('../Services/commentService');

const postComment = async (req, res, next) => {
  const { id: userId } = req.user;
  const { issueId, description } = req.body;
  try {
    const comment = await createCommentAndGetIt({ userId, issueId, description });
    if (comment === false) return res.status(500).json({ message: 'Internal Error' });
    return res.json({ comment });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Error' });
  }
};

const patchComment = async (req, res, next) => {
  const commentData = req.body;
  const { commentId } = req.params;
  try {
    const result = await updateCommentById(commentData, commentId);
    if (result.affectedRows === 0) return res.status(404).end();
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = { postComment, patchComment };
