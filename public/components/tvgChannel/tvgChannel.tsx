import * as React from "react";
import "../../styles/loader.scss";
import { TvgChannelProps } from "./tvgChannel";
import "./style.scss";
import $ from "jquery";
import "bootstrap";
import { Channel, Program } from "../entities";
import { DateTime } from "luxon";

export interface TvgChannelProps {
  channel: undefined | Channel;
  currentDate?: Date;
}

export default class TvgChannel extends React.PureComponent<
  TvgChannelProps,
  {}
> {
  constructor(props: TvgChannelProps) {
    super(props);
  }

  handleClickCollapse = (e: any) => {
    ($(e.target.attributes["data-target"].value) as any).collapse("toggle");
  };

  render() {
    const category = (c: any) => <span className="category">{c["#text"]}</span>;
    const subtitle = (p: Program) =>
      p["sub-title"] && (
        <small className="subtitle">{p["sub-title"]["#text"]}</small>
      );
    const date = (p: Program) =>
      p.date && <small className="date">{p.date}</small>;

    const persons = (actors: string[]) =>
      actors && actors.map((f: string, i: number) => <li key={i}>{f}</li>);

    const credits = (p: Program) =>
      p.credits && (
        <ul className="credits">
          {persons(
            Object.assign(
              [],
              p.credits.director && typeof "1" === typeof p.credits.director
                ? [p.credits.director]
                : p.credits.director,
              p.credits.presenter && typeof "1" === typeof p.credits.presenter
                ? [p.credits.presenter]
                : p.credits.presenter,
              p.credits.actor && typeof "1" === typeof p.credits.actor
                ? [p.credits.actor]
                : p.credits.actor,
              p.credits.writer && typeof "1" === typeof p.credits.writer
                ? [p.credits.writer]
                : p.credits.writer
            )
          )}
        </ul>
      );
    const country = (p: Program) =>
      p.country && <small className="country">{p.country["#text"]}</small>;

    const listItems =
      this.props.channel &&
      this.props.channel.programs &&
      this.props.channel.programs.map(p => (
        <li className="program-item row" key={p.channel + p.start}>
          <span className="start">
            <h3>{p.startTime.toLocaleString(DateTime.TIME_24_SIMPLE)}</h3>
          </span>
          <span className="content">
            <a
              className="title"
              data-toggle="collapse"
              data-target={"#" + p.id}
              onClick={e => this.handleClickCollapse(e)}
            >
              {p.title["#text"]}
            </a>
            <span>{p.category && category(p.category)}</span>

            <div className="collapse" id={p.id}>
              <div className="row details">
                {subtitle(p)}
                {date(p)}
                {country(p)}
                {credits(p)}
              </div>
              <div className="row">
                <p className="desc">{p.desc && p.desc["#text"]}</p>
                <span className="icon">
                  {p.icon && <img src={p.icon.src} />}
                </span>
              </div>
            </div>
          </span>
        </li>
      ));
    return (
      this.props.channel && (
        <div className="tvgChannel row">
          <div className="channel"> {this.props.channel.id} </div>
          <ul className="programs">{listItems}</ul>
        </div>
      )
    );
  }
}
