const comment = require('../Models/commentModel');
const { db } = require('../Models/dbPool');

const createCommentAndGetIt = async ({ userId, issueId, description }) => {
  let conn;
  try {
    conn = await db.getConnection();
    await conn.beginTransaction();
    const [{ insertId }] = await comment.create({ userId, issueId, description }, conn);
    const [createdComment] = await comment.getById(insertId, conn);
    await conn.commit();
    return createdComment;
  } catch (err) {
    if (conn) await conn.rollback();
    return false;
  } finally {
    if (conn) conn.release();
  }
};

const updateCommentById = async ({ description }, id) => {
  const [result] = await comment.updateById({ description }, id);
  // TODO: Is result needed?
  return result;
};

module.exports = { updateCommentById, createCommentAndGetIt };
