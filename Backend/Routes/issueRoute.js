const router = require('express').Router();
const { db } = require('../Models/dbPool');

router.post('', async (req, res) => {
  const { title, userId, milestoneId, labels, assignees } = req.body;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // issue 추가 - 추가된 id 받기
    // comment 추가

    // 있을 때만 작업해줄 데이터!
    // milestone
    // labels (관계테이블), 반복문
    // Assignees (관계테이블), 반복문
  } catch {}
});
