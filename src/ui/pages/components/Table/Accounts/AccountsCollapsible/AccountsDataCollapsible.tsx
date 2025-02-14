import {
	alpha,
	Box,
	Button,
	Chip,
	FormControl,
	FormLabel,
	IconButton,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	styled,
	Tooltip,
} from "@mui/material";
import CollapsibleCotainer from "../../../StyledComponent/CollapsibleContainer";
import DetailsTextfield from "../../DetailsTextField";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useContext, useEffect, useState } from "react";
import { TableContext } from "../../../../context/TableContext";
import useUploadImage from "../../../../hooks/useUploadImage";
import ImageButton from "../../../StyledComponent/ImageButton";
import BorderedImage from "../../Books/BooksCollapsible/BorderedImage";
import CONFIG from "../../../../../config";
import { convertProfile } from "../../../../../utils/ImageHelper";

type Props = {
	row: any;
	isEditable?: boolean;
};

export default function AccountsDataCollapsible({ row, isEditable }: Props) {
	return (
		<CollapsibleCotainer>
			<Box
				component={Paper}
				elevation={0}
				sx={{
					display: "flex",
					justifyContent: "center",
					gap: 2,
					width: "100%",
				}}
			>
				<UploadImageButton edit={isEditable} row={row} />
				<DetailsContainer edit={isEditable} row={row} />
			</Box>
		</CollapsibleCotainer>
	);
}

const Container1 = styled(Box)(() => ({
	display: "flex",
	flexDirection: "column",
	gap: "1rem",
	width: "6rem",
	minWidth: "6rem",
}));

function UploadImageButton({
	edit,
	row,
}: {
	edit?: boolean | false;
	row: any;
}) {
	const {
		imageSource,
		loading,
		handleButtonClick,
		handleUpload,
		fileInputRef,
	} = useUploadImage({
		aspectRatio: 1,
		edit: edit || false,
		src: row.profile_pic && convertProfile(row.profile_pic),
		image_blob: row.profile_pic_blob,
		metadata: { key: "profile_pic", id: row.id },
	});

	if (edit) {
		return (
			<Container1>
				<input
					type="file"
					ref={fileInputRef}
					style={{ display: "none" }}
					accept="image/*"
					onChange={handleUpload}
				/>
				<ImageButton
					sx={{
						width: "6rem",
						height: "6rem",
						"&:before": {
							backgroundImage: imageSource ? `url(${imageSource})` : "none",
						},
					}}
					onClick={handleButtonClick}
					variant="outlined"
				>
					UPLOAD
				</ImageButton>
			</Container1>
		);
	}
	return (
		<BorderedImage
			sx={{ width: "6rem", height: "6rem" }}
			src={imageSource || (row.profile_pic && convertProfile(row.profile_pic))}
			isLoading={loading}
			alt="Profile"
		/>
	);
}

const Container = styled(Box)(() => ({
	display: "flex",
	flexDirection: "column",
	gap: "1.5rem",
	width: "100%",
}));
const HorizontalContaner = styled(Box)(() => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	gap: "1rem",
	width: "100%",
}));

function DetailsContainer({ edit, row }: { edit?: boolean | false; row: any }) {
	const { availableRoles } = useContext(TableContext);
	// const { availableRoles: insertRoles } = useContext(TableInsertContext);
	// const { availableRoles: updateRoles } = useContext(TableUpdateContext);

	// useEffect(() => {
	// 	if (!edit) return;
	// 	if (insertRoles && insertRoles?.length > 0) {
	// 		setRoles(insertRoles);
	// 		return;
	// 	}
	// 	if (updateRoles && updateRoles?.length > 0) {
	// 		setRoles(updateRoles);
	// 		return;
	// 	}
	// }, []);

	const { handleEditEntry: handleEdit } = useContext(TableContext);

	return (
		<Container>
			<HorizontalContaner>
				<IconButton
					onClick={
						edit && row.created_at
							? () => handleEdit(row.id, "is_verified", !row.is_verified)
							: undefined
					}
					sx={(theme) => ({
						padding: 0,
						animation: edit && row.created_at ? "blink 3s infinite" : "none",
						"@keyframes blink": {
							"0%": {
								transform: "scale(1)",
								boxShadow: `0 0 0 0  ${alpha(
									row.is_verified
										? theme.palette.success.main
										: theme.palette.text.secondary,
									0.7
								)}`,
							},
							"25%": {
								transform: "scale(1.05)",
								boxShadow: `0 0 0 10px ${alpha(
									row.is_verified
										? theme.palette.success.main
										: theme.palette.text.secondary,
									0
								)}`,
							},
							"50%": {
								transform: "scale(1)",
								boxShadow: `0 0 0 0 ${alpha(
									row.is_verified
										? theme.palette.success.main
										: theme.palette.text.secondary,
									0
								)}`,
							},
							"100%": {
								transform: "scale(1)",
								boxShadow: `0 0 0 0 ${alpha(
									row.is_verified
										? theme.palette.success.main
										: theme.palette.text.secondary,
									0
								)}`,
							},
						},
					})}
				>
					<Tooltip
						placement="right"
						title={
							row.created_at
								? row.is_verified
									? "Verified"
									: "Not Verified"
								: "Accounts are automatically verified when added using the manager"
						}
					>
						<VerifiedIcon
							sx={(theme) => ({
								fill: row.is_verified
									? theme.palette.success.main
									: theme.palette.text.secondary,
							})}
						/>
					</Tooltip>
				</IconButton>
				<DetailsTextfield
					slotProps={{
						htmlInput: {
							maxLength: 10,
							minLength: 7,
						},
					}}
					disabled={!edit}
					label="School ID"
					iniitialValue={row.school_id}
					required={edit || false}
					dataIndex={{ id: row.id, key: "school_id" }}
				/>
				<DetailsTextfield
					disabled={!edit}
					label="First Name"
					iniitialValue={row.first_name}
					required={edit || false}
					dataIndex={{ id: row.id, key: "first_name" }}
				/>
				<DetailsTextfield
					disabled={!edit}
					label="Last Name"
					iniitialValue={row.last_name}
					required={edit || false}
					dataIndex={{ id: row.id, key: "last_name" }}
				/>
			</HorizontalContaner>
			<HorizontalContaner>
				<DetailsTextfield
					disabled={!edit}
					label="Email"
					iniitialValue={row.email}
					required={edit || false}
					dataIndex={{ id: row.id, key: "email" }}
				/>
				<DetailsTextfield
					type="password"
					disabled={!edit}
					label="Password"
					iniitialValue={row.first_name}
					required={edit || false}
					dataIndex={{ id: row.id, key: "password" }}
				/>
				{edit && (
					<LabeledSelect
						defaultValue={row.role_id}
						disabled={row.id === 1}
						label="role_id"
						onChange={(e: any) => handleEdit(row.id, "role_id", e.target.value)}
					>
						{(availableRoles || []).map((role: any) => {
							return (
								<MenuItem key={role.id} value={role.id}>
									{role.role_name}
								</MenuItem>
							);
						})}
					</LabeledSelect>
				)}
			</HorizontalContaner>
		</Container>
	);
}

interface LabeledSelectProps {
	children?: React.ReactNode | null;
	label?: string | "";
	[props: string]: any;
}

export function LabeledSelect({
	children,
	label,

	...props
}: LabeledSelectProps) {
	return (
		<FormControl sx={{ width: "100%" }}>
			<InputLabel
				sx={{ fontWeight: "bold" }}
				size="small"
				id={`${label}-select-label`}
			>
				{label}
			</InputLabel>
			<Select
				labelId={`${label}-select-label`}
				label={label}
				id={`${label}-select`}
				size="small"
				{...props}
				fullWidth
			>
				{children}
			</Select>
		</FormControl>
	);
}
