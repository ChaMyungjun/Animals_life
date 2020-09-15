import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;

const snaitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blcokquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};

const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; //Bad Request 잘못된 요청을 보냈음
    return;
  }
  try {
    const post = await Post.findById(id);
    //포스트 존재하지 않을 시
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const write = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    image: Joi.string()
  });

  //검증하고 나서 실패인 경우
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400; //Bad Request
    ctx.body = result.error;
    return;
  }
  const { title, body, tags, image } = ctx.request.body;
  const post = new Post({
    title,
    body: sanitizeHtml(body, snaitizeOption),
    tags,
    image,
    user: ctx.state.user,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const list = async (ctx) => {
  const page = parseInt(ctx.query.page || '1', 10);
  if (page < 1) {
    ctx.status = 400;
    return;
  }
  const { tag, nickname } = ctx.query;
  //값이 유효할경우 tag에 넣는다
  const query = {
    ...(nickname ? { 'user.nickname': nickname } : {}),
    ...(tag ? { tags: tag } : {}),
  };
  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const postCount = await Post.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));
    ctx.body = posts.map((post) => ({
      ...post,
      body: removeHtmlAndShorten(post.body),
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const read = async (ctx) => {
  ctx.body = ctx.state.post;
};

export const remove = async (ctx) => {
  const { id } = ctx.params;

  try {
    await (await Post.findByIdAndRemove(id)).execPopulate();
    ctx.status = 204; //No Content
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const update = async (ctx) => {
  const { id } = ctx.params;
  const nextData = { ...ctx.request.body };
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body);
  }
  try {
    const post = await (
      await Post.findByIdAndUpdate(id, nextData, {
        new: true, 
        //이 값을 설정시 업데이트된 데이터 반환
        //false일 때면 업데이트되기 전의 데이터를 반환
      })
    ).execPopulate();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};
