import React, { useState } from "react";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGroups, GroupResponse } from "../../api/groups";

import GroupCard from "../../components/GroupCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import { groupFetchAction, useAppSelector } from "../../Store";
interface Props {}

const Dashboard: React.FC<Props> = (props) => {

  const groupData = useAppSelector((state) => state.groups);
  const dispatcher = useDispatch();
  const [query, setQuery] = useState("");
  const [requesting , setRequesting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const changedValue = event.target.value;
    setQuery(changedValue);
  };

  useEffect(() => {
    setRequesting(true);
    fetchGroups({ status: "all-groups", query }).then((data) => {
      dispatcher(groupFetchAction(data!));
      setRequesting(false);
    });
  }, [query]);

   

  return (
    <>
      <div>
        This is DashBoard.
        <Link to="/recordings" className="text-blue-700 hover:underline">
          <span>Go to Recordings</span>
        </Link>
        <div>
        <SearchBar value={query} onChange={handleChange}>{ requesting && <FaSpinner className="animate-spin"></FaSpinner>}</SearchBar>
        </div>
        
        <div>
          {groupData?.map((value,key) => {
            return (
              <div className={" text-white hover:opacity-90 rounded-xl " + (key%2 == 0 ? "bg-gray-600" : "bg-gray-400")}>
                <GroupCard
                  src={value.group_image_url}
                  description={value.description}
                  title={value.name}
                ></GroupCard>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

Dashboard.defaultProps = {};
export default Dashboard;
