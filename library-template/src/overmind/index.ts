import {
  createActionsHook,
  createStateHook,
  createReactionHook,
} from "overmind-react";
import { state } from "./state";
import * as actions from "./actions";
import { IContext } from "overmind";

export type Context = IContext<typeof config>;

export const config = {
  state,
  actions,
};

export const useAppState = createStateHook<Context>();
export const useActions = createActionsHook<Context>();
export const useReaction = createReactionHook<Context>();
